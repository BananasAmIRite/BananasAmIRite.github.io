import { useContext, useEffect } from 'react';
import { BGAnimationContext } from '../App';
import { BackgroundCircle, InterUpdateFunction } from '../components/CoolBackgroundAnimation';
import AboutBackgroundAnimation, { AboutPoint } from '../components/about/AboutAnimation';
import { motion } from 'framer-motion';
import AboutPointTooltip from '../components/about/AboutPointLink';

const aboutPoints: AboutPoint[] = [
    {
        x: 0.25,
        y: 0.25,
        pointName: 'Badminton!',
        pointTo: '/about/badminton',
    },
    {
        x: 0.5,
        y: 0.75,
        pointName: 'Another About!',
        pointTo: '/',
    },
];

export default function AboutPage() {
    // const animFunc: InterUpdateFunction = (circles, ctx) => {
    //     const width = ctx.canvas.width;
    //     const height = ctx.canvas.height;
    //     const kP = 0.05;

    //     const distance = (circle: BackgroundCircle, point: AboutPoint) =>
    //         Math.hypot(Math.abs(point.x * width - circle.x), Math.abs(point.y * height - circle.y));

    //     for (const circle of circles) {
    //         const sortedPoints = aboutPoints.sort((a, b) => distance(circle, a) - distance(circle, b));
    //         const closest = sortedPoints[0];

    //         const noiseFactor = Math.hypot(mouseX - closest.x * width, mouseY - closest.y * height) < 10 ? 5 : 3;

    //         circle.dx =
    //             kP * (closest.x * width - circle.x) +
    //             (Math.random() - 0.5) * noiseFactor * (distance(circle, closest) < noiseFactor * 2 ? 1 : 0);
    //         circle.dy =
    //             kP * (closest.y * height - circle.y) +
    //             (Math.random() - 0.5) * noiseFactor * (distance(circle, closest) < noiseFactor * 2 ? 1 : 0);
    //     }
    // };

    // useEffect(() => {
    //     setAnimateFunc(animFunc);
    //     window.addEventListener('mousemove', (e) => {
    //         mouseX = e.offsetX;
    //         mouseY = e.offsetY;
    //     });

    //     return () => setAnimateFunc(() => {});
    // }, []);

    return (
        <motion.div
        // animate={{
        //     opacity: 1,
        // }}
        // exit={{
        //     opacity: 1,
        //     transition: {
        //         delay: 2,
        //     },
        // }}
        >
            <div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        zIndex: '0',
                    }}
                >
                    <AboutBackgroundAnimation
                        // circles={bgAnimRef?.current?.circleList ?? []}
                        aboutPoints={aboutPoints}
                    />
                </div>
            </div>
        </motion.div>
    );
}
