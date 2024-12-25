import { useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { BackgroundCircle } from '../CoolBackgroundAnimation';
import { BGAnimationContext } from '../../App';
import AboutPointTooltip from './AboutPointLink';

export interface AboutPoint {
    x: number; // NOTE: percent
    y: number; // NOTE: percent
    pointName: string;
    pointTo: string;
}

export type InterUpdateFunction = (circles: BackgroundCircle[], ctx: CanvasRenderingContext2D) => void;

export default function AboutBackgroundAnimation(props: { aboutPoints: AboutPoint[] }) {
    const { setAnimateFunc, bgAnimRef } = useContext(BGAnimationContext);

    let circles: AboutBGCircle[] = [];

    let mouseX = 0;
    let mouseY = 0;

    const mouseLine = (ctx: CanvasRenderingContext2D) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 1;

        const distance = (x: number, y: number, point: AboutPoint) =>
            Math.hypot(Math.abs(point.x * width - x), Math.abs(point.y * height - y));

        const sortedPoints = props.aboutPoints.sort(
            (a, b) => distance(mouseX, mouseY, a) - distance(mouseX, mouseY, b)
        );

        const closestAbtPt = sortedPoints[0];
        const dist = distance(mouseX, mouseY, closestAbtPt);
        if (dist > width / 10) return;
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(closestAbtPt.x * width, closestAbtPt.y * height);
        ctx.stroke();
    };

    const render = useCallback<InterUpdateFunction>((actualCircles, ctx) => {
        circles.forEach((circ) => circ.update(ctx, mouseX, mouseY));
        mouseLine(ctx);
    }, []);

    useEffect(() => {
        circles = (bgAnimRef?.current?.circleList ?? []).map((e) => new AboutBGCircle(e, props.aboutPoints));
        window.addEventListener('mousemove', (e) => {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        });
        setAnimateFunc(render);

        return () => {
            setAnimateFunc(() => {});

            circles.forEach((e) => e.bgCircle.setTargetNav(e.originalX, e.originalY, false, 100));
        };
    }, []);

    return (
        <>
            <div>
                {props.aboutPoints.map((e) => (
                    <div
                        style={{
                            position: 'absolute',
                            left: `${(e.x + 0.01) * 100}vw`,
                            top: `${(e.y + 0.01) * 100}vh`,
                        }}
                    >
                        <AboutPointTooltip text={e.pointName} to={e.pointTo} />
                    </div>
                ))}
            </div>
        </>
    );
}

class AboutBGCircle {
    private lastX: number;
    private lastY: number;
    private closestPoint!: AboutPoint;
    private closestPointAngle!: number;
    private closestPointPercent!: number;
    private closestPointX!: number;
    private closestPointY!: number;

    public originalX: number;
    public originalY: number;
    constructor(public bgCircle: BackgroundCircle, private aboutPoints: AboutPoint[]) {
        this.originalX = bgCircle.x;
        this.originalY = bgCircle.y;
        this.lastX = bgCircle.x;
        this.lastY = bgCircle.y;

        this.computeClosestPoint();
    }

    update(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
        this.updateSize(ctx, mouseX, mouseY);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = this.bgCircle.radius * 2;
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(this.bgCircle.x, this.bgCircle.y);
        ctx.stroke();
        this.lastX = this.bgCircle.x;
        this.lastY = this.bgCircle.y;
    }

    private updateSize(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        this.closestPointX = this.closestPoint.x * width;
        this.closestPointY = this.closestPoint.y * height;

        if (Math.hypot(mouseX - this.closestPointX, mouseY - this.closestPointY) < 20) {
            // this.closestPointAngle = Math.random() * 2 * Math.PI;
            const pt = this.calcCirclePoint(20, ctx, mouseX, mouseY);
            this.bgCircle.setTargetNav(pt.x / width, pt.y / height);
        } else {
            const pt = this.calcCirclePoint(5, ctx, mouseX, mouseY);
            this.bgCircle.setTargetNav(pt.x / width, pt.y / height);
        }
    }

    private computeClosestPoint() {
        const distance = (circle: BackgroundCircle, point: AboutPoint) =>
            Math.hypot(Math.abs(point.x - circle.x), Math.abs(point.y - circle.y));

        const sortedPoints = this.aboutPoints.sort((a, b) => distance(this.bgCircle, a) - distance(this.bgCircle, b));
        const closest = sortedPoints[0];
        this.closestPoint = closest;
        this.closestPointAngle = Math.random() * 2 * Math.PI;
        this.closestPointPercent = Math.random();
    }

    private calcCirclePoint(
        distance: number,
        ctx: CanvasRenderingContext2D,
        mouseX: number,
        mouseY: number
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
}
