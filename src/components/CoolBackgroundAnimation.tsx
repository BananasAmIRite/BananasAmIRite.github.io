import { useEffect, useRef, useState } from 'react';

export default function CoolBackgroundAnimation() {
    const ref = useRef<HTMLCanvasElement>(null);

    const circles: BackgroundCircle[] = [];

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
                    Math.random() * ref.current.width,
                    Math.random() * ref.current.height,
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5,
                    2,
                    Math.random() * 0.25
                )
            );
        }
    };

    const render = () => {
        if (!ref.current) return requestAnimationFrame(render);
        resizeCanvas(ref.current);
        const ctx = ref.current.getContext('2d');
        if (!ctx) return requestAnimationFrame(render);
        ctx.clearRect(0, 0, ref.current.width, ref.current.height);
        circles.forEach((c) => c.update(ctx));
        requestAnimationFrame(render);
    };

    useEffect(() => {
        if (!ref.current) return;

        resizeCanvas(ref.current);
        fillWithCircles();
        const fr = requestAnimationFrame(render);

        return () => cancelAnimationFrame(fr);
    }, []);

    return <canvas width='100%' height='100%' style={{ width: '100%', height: '100%' }} ref={ref}></canvas>;
}

class BackgroundCircle {
    private lastScrollY: number = 0;
    private lastScrollX: number = 0;

    private currentScrollX = 0;
    private currentScrollY = 0;
    constructor(
        private x: number,
        private y: number,
        private dx: number,
        private dy: number,
        private radius: number,
        private scrollFactor: number
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(
            this.x - this.currentScrollX * this.scrollFactor,
            this.y - this.currentScrollY * this.scrollFactor,
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

        this.x += this.dx;
        this.y += this.dy;

        if (this.x > ctx.canvas.width || this.x < 0) this.x = Math.abs(this.x - ctx.canvas.width);
        if (this.y > ctx.canvas.height || this.y < 0) this.y = Math.abs(this.y - ctx.canvas.height);
        this.draw(ctx);
    }
}
