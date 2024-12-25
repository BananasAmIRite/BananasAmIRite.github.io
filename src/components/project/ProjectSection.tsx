import { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function ProjectSection(props: { style?: CSSProperties; children?: ReactNode }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',

                ...props.style,
            }}
        >
            {props.children}
        </div>
    );
}

export function ProjectSectionTitle(props: { style?: CSSProperties; children?: ReactNode }) {
    const variants = {
        before: {
            x: -50,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
        },
    };
    return (
        <motion.div
            initial='before'
            whileInView='animate'
            variants={variants}
            style={{
                textDecoration: 'underline',
                fontSize: '2.25em',
                padding: '1em',
                ...props.style,
            }}
        >
            {props.children}
        </motion.div>
    );
}

export function ProjectSectionBody(props: { style?: CSSProperties; children?: ReactNode }) {
    const variants = {
        before: {
            transform: 'translate(-50px, 0)',
            opacity: 0,
        },
        animate: {
            transform: 'translate(0, 0)',
            opacity: 1,
        },
    };
    return (
        <motion.div
            initial='before'
            whileInView='animate'
            variants={variants}
            style={{
                textDecoration: 'none',
                fontSize: '1em',
                padding: '1em',
                ...props.style,
            }}
        >
            {props.children}
        </motion.div>
    );
}
