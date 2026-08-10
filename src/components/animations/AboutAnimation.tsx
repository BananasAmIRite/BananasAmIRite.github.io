import { useCallback, useContext, useEffect, useRef } from 'react';
import { BackgroundCircle, InterUpdateFunction } from './CoolBackgroundAnimation';
import { BGAnimationContext } from '../../App';
import AboutPointTooltip from '../about/AboutPointLink';

export interface AboutPoint {
    x: number; // NOTE: percent
    y: number; // NOTE: percent
    pointName: string;
    pointTo: string;
}

export default function AboutBackgroundAnimation(props: { aboutPoints: AboutPoint[] }) {
    const { setAnimateFunc, bgAnimRef } = useContext(BGAnimationContext);

    const circlesRef = useRef<AboutBGCircle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    const mouseLine = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            const { x: mouseX, y: mouseY } = mouseRef.current;

            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 1;

            const distance = (x: number, y: number, point: AboutPoint) =>
                Math.hypot(Math.abs(point.x * width - x), Math.abs(point.y * height - y));

            const sortedPoints = [...props.aboutPoints].sort(
                (a, b) => distance(mouseX, mouseY, a) - distance(mouseX, mouseY, b),
            );

            const closestAbtPt = sortedPoints[0];
            const dist = distance(mouseX, mouseY, closestAbtPt);
            if (dist > width / 10) return;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(
                closestAbtPt.x * width - (mouseY - ctx.canvas.height / 2) * 0.01,
                closestAbtPt.y * height - (mouseY - ctx.canvas.height / 2) * 0.01,
            );
            ctx.stroke();
        },
        [props.aboutPoints],
    );

    const render = useCallback<InterUpdateFunction>(
        (actualCircles, ctx) => {
            const { x: mouseX, y: mouseY } = mouseRef.current;
            circlesRef.current.forEach((circ) => circ.update(ctx, mouseX, mouseY));
            mouseLine(ctx);
        },
        [mouseLine],
    );

    useEffect(() => {
        circlesRef.current = (bgAnimRef?.current?.circleList ?? []).map((e) => new AboutBGCircle(e, props.aboutPoints));

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.offsetX;
            mouseRef.current.y = e.offsetY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        setAnimateFunc(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [bgAnimRef, props.aboutPoints, render, setAnimateFunc]);

    return (
        <>
            <div>
                {props.aboutPoints.map((e, i) => (
                    <div
                        key={`${e.pointName}-${i}`}
                        style={{
                            position: 'absolute',
                            left: `${(e.x - 0.01) * 100}vw`, // trick to move the tooltip div closer to the point and then superficially offset the text to increase click
                            top: `${(e.y - 0.01) * 100}vh`,
                        }}
                    >
                        <AboutPointTooltip
                            text={e.pointName}
                            to={e.pointTo}
                            onHoverStart={() => {
                                for (const circle of circlesRef.current) {
                                    if (circle && circle.closestPoint === e) {
                                        circle.hovering = true;
                                    }
                                }
                            }}
                            onHoverEnd={() => {
                                for (const circle of circlesRef.current) {
                                    if (circle && circle.closestPoint === e) {
                                        circle.hovering = false;
                                    }
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

class AboutBGCircle {
    private static trailingPointsLength = 1;
    private trailingPoints: { x: number; y: number }[];
    public closestPoint!: AboutPoint;
    private closestPointAngle!: number;
    private closestPointPercent!: number;
    private closestPointX!: number;
    private closestPointY!: number;

    public originalX: number;
    public originalY: number;

    public hovering: boolean = false;
    constructor(
        public bgCircle: BackgroundCircle,
        private aboutPoints: AboutPoint[],
        private onClick: () => void = () => {},
    ) {
        this.originalX = bgCircle.x;
        this.originalY = bgCircle.y;
        this.trailingPoints = [];

        this.computeClosestPoint();
    }

    update(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
        this.updateSize(ctx, mouseX, mouseY);

        this.updateTrailingPoints(this.bgCircle.x, this.bgCircle.y);
        this.drawTrailingPoints(ctx);
    }

    private updateSize(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        this.closestPointX = this.closestPoint.x * width;
        this.closestPointY = this.closestPoint.y * height;

        if (Math.hypot(mouseX - this.closestPointX, mouseY - this.closestPointY) < 20 || this.hovering) {
            // this.closestPointAngle = Math.random() * 2 * Math.PI;
            const pt = this.calcCirclePoint(20, ctx, mouseX, mouseY);
            this.bgCircle.setTargetNav(pt.x / width, pt.y / height);
        } else {
            const pt = this.calcCirclePoint(5, ctx, mouseX, mouseY);
            this.bgCircle.setTargetNav(pt.x / width, pt.y / height);
        }
    }

    private computeClosestPoint() {
        this.closestPoint = this.aboutPoints[Math.floor(Math.random() * this.aboutPoints.length)];
        this.closestPointAngle = Math.random() * 2 * Math.PI;
        this.closestPointPercent = Math.random();
    }

    private calcCirclePoint(
        distance: number,
        ctx: CanvasRenderingContext2D,
        mouseX: number,
        mouseY: number,
    ): { x: number; y: number } {
        return {
            x:
                this.closestPointX +
                distance * Math.cos(this.closestPointAngle) * this.closestPointPercent -
                (mouseX - ctx.canvas.width / 2) * 0.01,
            y:
                this.closestPointY +
                distance * Math.sin(this.closestPointAngle) * this.closestPointPercent -
                (mouseY - ctx.canvas.height / 2) * 0.01,
        };
    }

    private updateTrailingPoints(x: number, y: number) {
        if (this.trailingPoints.length >= AboutBGCircle.trailingPointsLength) {
            this.trailingPoints.shift();
        }
        this.trailingPoints.push({ x, y });
    }

    private drawTrailingPoints(ctx: CanvasRenderingContext2D) {
        if (this.trailingPoints.length === 0) return;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = this.bgCircle.radius * 1;
        ctx.beginPath();
        ctx.moveTo(this.trailingPoints[0].x * ctx.canvas.width, this.trailingPoints[0].y * ctx.canvas.height);
        for (const p of this.trailingPoints) ctx.lineTo(p.x * ctx.canvas.width, p.y * ctx.canvas.height);
        ctx.stroke();
    }
}
