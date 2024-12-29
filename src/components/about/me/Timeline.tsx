import { ReactElement, useState } from 'react';
import { AnimationPlaybackControls, Segment, animate, motion, useScroll } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function Timeline() {
    const animControls = useRef<AnimationPlaybackControls>();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        animControls.current = animate([]);
        animControls.current.pause();
    }, []);
    useScroll().scrollYProgress.on('change', (yProgress) => {
        // Ensure the animation controls exist
        if (!animControls.current) return;

        // Calculate the new time for the animation based on scroll progress
        // animControls.current.time = yProgress * animControls.current.duration;
        setProgress(yProgress);
    });

    return (
        <motion.div
            style={{
                height: '90vh',
                width: '10px',
                backgroundColor: 'white',
                borderRadius: '5px',
                position: 'fixed',
                right: '10%',
                top: '5vh',
            }}
            animate={{
                background: `linear-gradient(green 0%, green ${progress * 100}%, white ${progress * 100}%, white 100%)`,
                height: '90vh',
            }}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            transition={{
                height: {
                    ease: 'circInOut',
                    duration: 1,
                },
            }}
        ></motion.div>
    );
}
