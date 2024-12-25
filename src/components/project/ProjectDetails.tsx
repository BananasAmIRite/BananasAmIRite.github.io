import { motion as m } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

export default function ProjectDetails(props: { style?: CSSProperties; children?: ReactNode; accentColor: string }) {
    const detailsVariant = {
        hidden: { opacity: 0, transform: 'translate(0, -50%)', scale: 0 },
        show: { opacity: 1, transform: 'translate(0, 0)', scale: 1 },
    };

    return (
        <m.div
            style={{
                backgroundColor: 'transparent',
                transition: 'background-color 0.25s',
                padding: '10px',
                justifyContent: 'center',
                display: 'flex',
                borderRadius: '10px',
                flexDirection: 'column',
                color: 'var(--bs-gray-100)',
                ...props.style,
            }}
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

export function ProjectDetailsTitle(props: { children?: ReactNode }) {
    return (
        <div
            style={{
                textDecoration: 'underline',
                fontSize: '16px',
                padding: '10px',
                width: '100%',
                height: '10%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {props.children}
        </div>
    );
}

export function ProjectDetailsBody(props: { children?: ReactNode }) {
    return (
        <div
            style={{
                textDecoration: 'none',
                width: '100%',
                height: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                padding: '10px',
            }}
        >
            <p>{props.children}</p>
        </div>
    );
}
