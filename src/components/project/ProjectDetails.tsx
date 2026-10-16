import { motion as m } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

export default function ProjectDetails(props: {
    style?: CSSProperties;
    children?: ReactNode;
    title?: ReactNode;
    blurb?: ReactNode;
    accentColor: string;
}) {
    const detailsVariant = {
        hidden: { opacity: 0, transform: 'translate(0, -50%)', scale: 0 },
        show: { opacity: 1, transform: 'translate(0, 0)', scale: 1 },
    };

    return (
        <m.div
            style={{
                backgroundColor: 'var(--bs-gray-800)',
                border: '1px solid var(--bs-gray-600)',
                transition: 'background-color 0.25s, border-color 0.25s, transform 0.25s',
                padding: '1.25rem',
                justifyContent: 'flex-start',
                display: 'flex',
                borderRadius: '8px',
                flexDirection: 'column',
                color: 'var(--bs-gray-100)',
                gap: '0.5rem',
                ...props.style,
            }}
            whileHover={{ backgroundColor: props.accentColor, borderColor: 'var(--bs-gray-400)', y: -4 }}
            variants={detailsVariant}
        >
            {props.title && <ProjectDetailsTitle>{props.title}</ProjectDetailsTitle>}
            {props.blurb && <ProjectDetailsBody>{props.blurb}</ProjectDetailsBody>}
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
                fontSize: '1rem',
                fontWeight: 700,
                padding: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                padding: 0,
                color: 'var(--bs-gray-300)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
            }}
        >{props.children}</div>
    );
}
