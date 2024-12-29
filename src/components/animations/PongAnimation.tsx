import { useCallback, useContext, useEffect, useState } from 'react';
import { BGAnimationContext } from '../../App';
import { BackgroundCircle, InterUpdateFunction } from '../../components/animations/CoolBackgroundAnimation';

export default function PongAnimation(props: { type: 'ai' | 'player' }) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const [leftPaddle, setLeftPaddle] = useState({ x: 0, y: 0 });
    const [rightPaddle, setRightPaddle] = useState({ x: 0, y: 0 });
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const [ballVector, setBallVector] = useState({ x: 0, y: 0 });

    const LEFT_POSITION = 0.1;
    const RIGHT_POSITION = 0.9;

    const PADDLE_HEIGHT = 100;
    const BALL_RADIUS = 3;

    const { setAnimateFunc, bgAnimRef } = useContext(BGAnimationContext);

    const [circles, setCircles] = useState<PingPongCircle[]>([]);

    const resetGame = () => {
        setBallPosition({ x: 0.5, y: 0.5 });
        setLeftPaddle({ x: 0.1, y: 0.5 });
        const randAngle = Math.random() * 2 * Math.PI;
        const randSpeed = 0.0025;
        setBallVector({ x: Math.cos(randAngle) * randSpeed, y: Math.sin(randAngle) * randSpeed });
    };

    const updateBallPosition = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            let x = ballPosition.x;
            let y = ballPosition.y;
            let dx = ballVector.x;
            let dy = ballVector.y;
            if (x - BALL_RADIUS / ctx.canvas.width < 0 || x + BALL_RADIUS / ctx.canvas.width > 1) {
                // collide with side
                resetGame();
                return;
            } else if (y - BALL_RADIUS / ctx.canvas.height < 0 || y + BALL_RADIUS / ctx.canvas.height > 1) {
                // tops
                dy *= -1;
            }

            // test paddle collisions
            if (
                ballCollidingWithPaddle(
                    {
                        x: x * ctx.canvas.width,
                        y: y * ctx.canvas.height,
                    },
                    BALL_RADIUS,
                    {
                        x: leftPaddle.x * ctx.canvas.width,
                        y: leftPaddle.y * ctx.canvas.height,
                    },
                    PADDLE_HEIGHT
                )
            ) {
                dx = Math.abs(dx);
            } else if (
                ballCollidingWithPaddle(
                    {
                        x: x * ctx.canvas.width,
                        y: y * ctx.canvas.height,
                    },
                    BALL_RADIUS,
                    {
                        x: rightPaddle.x * ctx.canvas.width,
                        y: rightPaddle.y * ctx.canvas.height,
                    },
                    PADDLE_HEIGHT
                )
            ) {
                dx = -Math.abs(dx);
            }

            x += dx;
            y += dy;
            setBallPosition({ x, y });
            setBallVector({ x: dx, y: dy });
        },
        [ballPosition, ballVector, leftPaddle, rightPaddle]
    );

    const updateAIPaddlePosition = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            paddle: { x: number; y: number },
            action: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
            pos: number,
            side: 'left' | 'right'
        ) => {
            let x = paddle.x;
            let y = paddle.y;
            x = pos;
            // maybe complicate this algo a lil bit
            if (
                (side === 'left' && ballPosition.x < 0.5 && ballVector.x < 0) ||
                (side === 'right' && ballPosition.x > 0.5 && ballVector.x > 0)
            ) {
                y = ballPosition.y;
            }
            if (y + PADDLE_HEIGHT / 2 / ctx.canvas.height > 1) y = 1 - PADDLE_HEIGHT / 2 / ctx.canvas.height;
            if (y - PADDLE_HEIGHT / 2 / ctx.canvas.height < 0) y = PADDLE_HEIGHT / 2 / window.innerHeight;
            action({ x, y });
        },
        [ballPosition, ballVector]
    );
    const updatePlayerPaddlePosition = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            paddle: { x: number; y: number },
            action: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
            pos: number
        ) => {
            let x = pos;
            let y = mouseY / ctx.canvas.height;
            if (rightPaddle.y + PADDLE_HEIGHT / 2 / ctx.canvas.height > 1)
                rightPaddle.y = 1 - PADDLE_HEIGHT / 2 / ctx.canvas.height;
            if (rightPaddle.y - PADDLE_HEIGHT / 2 / ctx.canvas.height < 0)
                rightPaddle.y = PADDLE_HEIGHT / 2 / ctx.canvas.height;
            action({ x, y });
        },
        [rightPaddle, mouseY]
    );

    const render = useCallback<InterUpdateFunction>(
        (actualCircles, ctx) => {
            updateAIPaddlePosition(ctx, leftPaddle, setLeftPaddle, LEFT_POSITION, 'left');
            if (props.type === 'ai') {
                updateAIPaddlePosition(ctx, rightPaddle, setRightPaddle, RIGHT_POSITION, 'right');
            } else {
                updatePlayerPaddlePosition(ctx, rightPaddle, setRightPaddle, RIGHT_POSITION);
            }
            updateBallPosition(ctx);

            for (const e of circles) {
                if (e instanceof BallCircle) {
                    e.update(
                        ctx,
                        ballPosition.x,
                        ballPosition.y,
                        BALL_RADIUS / window.innerWidth,
                        BALL_RADIUS / window.innerHeight
                    );
                } else if (e instanceof PaddleCircle) {
                    if (e.side === 'ai') {
                        e.update(ctx, leftPaddle.x, leftPaddle.y, PADDLE_HEIGHT / window.innerHeight);
                    } else {
                        e.update(ctx, rightPaddle.x, rightPaddle.y, PADDLE_HEIGHT / window.innerHeight);
                    }
                }
            }
        },
        [circles, mouseX, mouseY, leftPaddle, rightPaddle, ballPosition, ballVector]
    );

    useEffect(() => {
        setCircles(
            (bgAnimRef?.current?.circleList ?? []).map((e, i) =>
                i % 3 === 0
                    ? new BallCircle(e)
                    : i % 3 === 1
                    ? new PaddleCircle(e, (i / (bgAnimRef?.current?.circleList.length ?? 1)) * 0.8 + 0.1, 'ai')
                    : new PaddleCircle(e, (i / (bgAnimRef?.current?.circleList.length ?? 1)) * 0.8 + 0.1, 'player')
            )
        );
        window.addEventListener('mousemove', (e) => {
            setMouseX(e.offsetX);
            setMouseY(e.offsetY);
        });

        resetGame();
    }, [bgAnimRef]);

    useEffect(() => {
        setAnimateFunc(render);
    }, [render]);

    return <></>;
}

const ballCollidingWithPaddle = (
    ballPos: { x: number; y: number },
    ballRadius: number,
    paddlePos: { x: number; y: number },
    paddleHeight: number
): boolean => {
    const X1 = paddlePos.x;
    const Y1 = paddlePos.y - paddleHeight / 2;
    const X2 = paddlePos.x;
    const Y2 = paddlePos.y + paddleHeight / 2;

    const R = ballRadius;

    const Xc = ballPos.x;
    const Yc = ballPos.y;

    // Find the nearest point on the
    // rectangle to the center of
    // the circle
    const Xn = Math.max(X1, Math.min(Xc, X2));
    const Yn = Math.max(Y1, Math.min(Yc, Y2));

    // Find the distance between the
    // nearest point and the center
    // of the circle
    // Distance between 2 points,
    // (x1, y1) & (x2, y2) in
    // 2D Euclidean space is
    // ((x1-x2)**2 + (y1-y2)**2)**0.5
    const Dx = Xn - Xc;
    const Dy = Yn - Yc;

    return Dx * Dx + Dy * Dy <= R * R;
};

abstract class PingPongCircle {
    public originalX: number;
    public originalY: number;

    public constructor(public bgCircle: BackgroundCircle) {
        this.originalX = bgCircle.x;
        this.originalY = bgCircle.y;
    }
}

class BallCircle extends PingPongCircle {
    private angle: number;
    public constructor(circle: BackgroundCircle) {
        super(circle);
        this.angle = Math.random() * 2 * Math.PI;
    }

    public update(ctx: CanvasRenderingContext2D, ballX: number, ballY: number, rx: number, ry: number) {
        this.bgCircle.setTargetNav(ballX + rx * Math.cos(this.angle), ballY + ry * Math.sin(this.angle));
    }
}

class PaddleCircle extends PingPongCircle {
    public constructor(circle: BackgroundCircle, private paddlePercent: number, public side: 'ai' | 'player') {
        super(circle);
    }

    public update(ctx: CanvasRenderingContext2D, paddleX: number, paddleY: number, paddleHeight: number) {
        this.bgCircle.setTargetNav(paddleX, paddleY - paddleHeight / 2 + paddleHeight * this.paddlePercent);
    }
}
