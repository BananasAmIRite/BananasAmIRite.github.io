import { motion as m } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

export default function ProjectDetails(props: { style?: CSSProperties; children?: ReactNode; accentColor: string }) {
    const detailsVariant = {
        hidden: { opacity: 0, transform: 'translate(0, -50%)', scale: 0 },
        show: { opacity: 1, transform: 'translate(0, 0)', scale: 1 },
    };

    return (
        <m.div
            style={{ backgroundColor: 'transparent', transition: 'background-color 0.25s', ...props.style }}
            whileHover={{ backgroundColor: props.accentColor }}
            variants={detailsVariant}
        >
            {props.children}
        </m.div>
    );
}

export function ProjectDetailsContainer(props: { style?: CSSProperties; children?: ReactNode }) {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: 1,
            },
        },
    };

    return (
        <m.div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5vw',
                ...props.style,
            }}
            initial='hidden'
            animate='show'
            variants={container}
        >
            {props.children}
        </m.div>
    );
}
