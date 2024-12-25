import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

export type InterUpdateFunction = (circles: BackgroundCircle[], ctx: CanvasRenderingContext2D) => void;

const CoolBackgroundAnimation = forwardRef<
    { circleList: BackgroundCircle[] },
    { interUpdateFrame?: InterUpdateFunction }
>((props, rf) => {
    const ref = useRef<HTMLCanvasElement>(null);

    // const [rerenderCount, setRerenderCount] = useState(0);
    let rerenderCount = 0;

    const circles: BackgroundCircle[] = useMemo<BackgroundCircle[]>(() => [], []);

    useImperativeHandle(rf, () => ({
        circleList: circles,
    }));

    const resizeCanvas = (canvas: HTMLCanvasElement) => {
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // If it's resolution does not match change it
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }

        return false;
    };

    const fillWithCircles = () => {
        if (!ref.current) return;
        for (let i = 0; i < 50; i++) {
            circles.push(
                new BackgroundCircle(
                    Math.random(),
                    Math.random(),
                    (Math.random() - 0.5) * 0.0005,
                    (Math.random() - 0.5) * 0.0005,
                    2,
                    Math.random() * 0.25
                )
            );
        }
    };

    const render = useCallback(
        (cnt: number) => {
            if (rerenderCount !== cnt) return;
            if (!ref.current) return requestAnimationFrame(render);
            resizeCanvas(ref.current);
            const ctx = ref.current.getContext('2d');
            if (!ctx) return requestAnimationFrame(render);
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, ref.current.width, ref.current.height);
            if (props.interUpdateFrame) props.interUpdateFrame(circles, ctx);
            circles.forEach((c) => c.update(ctx));
            requestAnimationFrame(() => render(cnt));
        },
        [props.interUpdateFrame, rerenderCount]
    );

    useEffect(() => {
        if (!ref.current) return;

        const fr = requestAnimationFrame(() => render(rerenderCount));

        return () => {
            cancelAnimationFrame(fr);
            rerenderCount++;
        };
    }, [render, rerenderCount]);

    useEffect(() => {
        if (!ref.current) return;
        resizeCanvas(ref.current);
        fillWithCircles();
    }, []);

    useEffect(() => {}, [props.interUpdateFrame]);

    return (
        <canvas
            width='100%'
            height='100%'
            style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
            ref={ref}
        ></canvas>
    );
});

export class BackgroundCircle {
    private lastScrollY: number = 0;
    private lastScrollX: number = 0;

    private currentScrollX = 0;
    private currentScrollY = 0;

    private targetNav: {
        x: number;
        y: number;
        stay: boolean;
    } | null = null;
    constructor(
        public x: number,
        public y: number,
        public dx: number,
        public dy: number,
        public radius: number,
        private scrollFactor: number
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(
            this.x * ctx.canvas.width - this.currentScrollX * this.scrollFactor,
            this.y * ctx.canvas.height - this.currentScrollY * this.scrollFactor,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update(ctx: CanvasRenderingContext2D) {
        this.lastScrollX = window.scrollX;
        this.lastScrollY = window.scrollY;

        this.currentScrollX += Math.max(-50, Math.min(this.lastScrollX - this.currentScrollX, 50));
        this.currentScrollY += Math.max(-50, Math.min(this.lastScrollY - this.currentScrollY, 50));

        if (this.targetNav !== null) {
            this.x += (this.targetNav.x - this.x) * 0.05;
            this.y += (this.targetNav.y - this.y) * 0.05;
            if (
                !this.targetNav.stay &&
                Math.abs(this.x - this.targetNav.x) < 0.001 &&
                Math.abs(this.y - this.targetNav.y) < 0.001
            ) {
                this.cancelTargetNav();
            }
        } else {
            this.x += this.dx;
            this.y += this.dy;
        }

        if (this.x > 1 || this.x < 0) this.x = Math.abs(this.x - 1);
        if (this.y > 1 || this.y < 0) this.y = Math.abs(this.y - 1);
        this.draw(ctx);
    }
    copy() {
        const circle = new BackgroundCircle(this.x, this.y, this.dx, this.dy, this.radius, this.scrollFactor);
        circle.lastScrollX = this.lastScrollX;
        circle.lastScrollY = this.lastScrollY;
        circle.currentScrollX = this.currentScrollX;
        circle.currentScrollY = this.currentScrollY;
        return circle;
    }

    setTargetNav(x: number, y: number, stay: boolean = true) {
        this.targetNav = { x, y, stay };
    }
    cancelTargetNav() {
        this.targetNav = null;
    }
}

export default CoolBackgroundAnimation;
