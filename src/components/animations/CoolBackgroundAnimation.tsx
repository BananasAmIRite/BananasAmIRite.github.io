import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

export type InterUpdateFunction = (circles: BackgroundCircle[], ctx: CanvasRenderingContext2D) => void;

// root component for the animation (i have no idea how this works but it does!)
const CoolBackgroundAnimation = forwardRef<
    { circleList: BackgroundCircle[] },
    { interUpdateFrame?: InterUpdateFunction | null }
>((props, rf) => {
    const ref = useRef<HTMLCanvasElement>(null);

    let rerenderCount = 0;

    const circles: BackgroundCircle[] = useMemo<BackgroundCircle[]>(() => [], []);

    useImperativeHandle(rf, () => ({
        circleList: circles,
    }));

    const resizeCanvas = (canvas: HTMLCanvasElement) => {
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // If its resolution does not match change it
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }

        return false;
    };

    const fillWithCircles = () => {
        if (!ref.current) return;
        circles.length = 0;
        for (let i = 0; i < 100; i++) {
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
            if (!props.interUpdateFrame) circles.forEach((e) => e.updateNaturalPosition());
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

    private lastNaturalX: number = 0;
    private lastNaturalY: number = 0;

    private targetNav: {
        x: number;
        y: number;
        stay: boolean;
        importance: number;
    } | null = null;
    constructor(
        public x: number,
        public y: number,
        public dx: number,
        public dy: number,
        public radius: number,
        private scrollFactor: number
    ) {
        this.lastNaturalX = x;
        this.lastNaturalY = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x * ctx.canvas.width, this.y * ctx.canvas.height, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update(ctx: CanvasRenderingContext2D) {
        this.lastScrollX = this.currentScrollX;
        this.lastScrollY = this.currentScrollY;

        this.currentScrollX = window.scrollX;
        this.currentScrollY = window.scrollY;

        this.x += Math.min(
            Math.max(-50, Math.min(this.lastScrollX - this.currentScrollX, 50)) * 0.001 * this.scrollFactor
        );
        this.y += Math.min(
            Math.max(-50, Math.min(this.lastScrollY - this.currentScrollY, 50)) * 0.001 * this.scrollFactor
        );

        if (this.targetNav !== null) {
            this.x += (this.targetNav.x - this.x) * 0.05;
            this.y += (this.targetNav.y - this.y) * 0.05;
            if (
                !this.targetNav.stay &&
                Math.abs(this.x - this.targetNav.x) < 0.001 &&
                Math.abs(this.y - this.targetNav.y) < 0.001
            )
                this.cancelTargetNav();
        } else {
            this.x += this.dx;
            this.y += this.dy;
        }

        if (this.x < 0) this.x += 1;
        if (this.x > 1) this.x -= 1;
        if (this.y < 0) this.y += 1;
        if (this.y > 1) this.y -= 1;

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

    // importance = hackity hack hack (race conditions are mean :(( )
    setTargetNav(x: number, y: number, stay: boolean = true, importance: number = 1) {
        if (!this.targetNav || importance >= this.targetNav.importance) this.targetNav = { x, y, stay, importance };
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    updateNaturalPosition() {
        if (!this.targetNav) {
            this.lastNaturalX = this.x;
            this.lastNaturalY = this.y;
        }
    }

    toNaturalPosition() {
        this.setTargetNav(this.lastNaturalX, this.lastNaturalY, false, 100);
    }

    cancelTargetNav() {
        this.targetNav = null;
    }
}

export default CoolBackgroundAnimation;
