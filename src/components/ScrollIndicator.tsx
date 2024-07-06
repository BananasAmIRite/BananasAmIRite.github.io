import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

export default function ScrollIndicator(props: { width: number; height: number }) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => {
            const delay = 1 + i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 },
                },
            };
        },
    };

    return (
        <HashLink to='/#about'>
            <motion.svg width={props.width} height={props.height} fill='none' initial='hidden' animate='visible'>
                <motion.path
                    d={`M${props.width / 2} 0 L${props.width / 2} ${props.height}`}
                    stroke='white'
                    variants={draw}
                    strokeWidth={2}
                    custom={0}
                />
                <motion.path
                    d={`M0 ${props.height - props.width / 2} L${props.width / 2} ${props.height} L${props.width} ${
                        props.height - props.width / 2
                    }`}
                    stroke='white'
                    variants={draw}
                    strokeWidth={2}
                    custom={1}
                />
            </motion.svg>
        </HashLink>
    );
}
