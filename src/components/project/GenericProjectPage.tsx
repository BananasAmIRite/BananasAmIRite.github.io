import { ReactNode } from 'react';
import { motion as m } from 'framer-motion';
import CoolLink from '../CoolLink';

export function ProjectTextBlock(props: { title: ReactNode; children?: ReactNode }) {
    return (
        <m.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            style={{
                width: '100%',
                padding: 'clamp(3rem, 8vw, 7rem) 5vw',
                boxSizing: 'border-box',
                // borderTop: '1px solid var(--bs-gray-600)',
                backgroundColor: 'var(--bs-gray-800)',
                color: 'var(--bs-gray-100)',
            }}
        >
            <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto' }}>
                <h2
                    style={{
                        margin: '0 0 1.5rem',
                        color: 'var(--bs-gray-100)',
                        fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                        lineHeight: 1.1,
                    }}
                >
                    {props.title}
                </h2>
                <div
                    style={{
                        color: 'var(--bs-gray-300)',
                        fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                        lineHeight: 1.75,
                    }}
                >
                    {props.children}
                </div>
            </div>
        </m.section>
    );
}

export interface ProjectPageProps {
    title: string;
    image?: string;
    sections?: ReactNode;
    titleChildren?: ReactNode;
    children?: ReactNode;
    onExit?: () => void;
}

export default function GenericProjectPage(props: ProjectPageProps) {
    return (
        <m.div
            style={{
                width: '100%',
                minHeight: '100vh',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 110,
                backgroundColor: 'transparent',
                height: '100vh',
                overflowY: 'auto',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // transition={{ staggerChildren: 0.5 }}
        >
            <div style={{ width: '100%' }}>
                <m.div
                    style={{
                        width: '100%',
                        height: '100vh',
                        minHeight: '500px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                >
                    <m.div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            backgroundColor: 'transparent',
                            width: '100px',
                            height: '30px',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                    >
                        <CoolLink
                            style={{
                                color: 'white',
                                left: '20px',
                                top: '15px',
                            }}
                            active={false}
                            onClick={() => {
                                if (props.onExit) props.onExit();
                            }}
                        >
                            Back
                        </CoolLink>
                    </m.div>
                    <m.h1
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            color: 'var(--bs-gray-100)',
                            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                            textAlign: 'center',
                            margin: 0,
                            padding: '0 5vw',
                        }}
                        initial={{ opacity: 0, y: 36, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 16, mass: 0.8, delay: 0.15 }}
                    >
                        {props.title}
                    </m.h1>
                </m.div>
                <m.div
                    style={{
                        width: '100%',
                        minHeight: '45vh',
                        padding: '4rem 5vw',
                        boxSizing: 'border-box',
                        backgroundColor: 'var(--bs-gray-800)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    initial={{ opacity: 0, transform: 'translate(0, 15vh)' }}
                    animate={{ opacity: 1, transform: 'translate(0, 0)' }}
                    transition={{ delay: 0.5 }}
                >
                    {props.titleChildren}
                </m.div>
            </div>
            <m.div
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                initial={{ opacity: 0, transform: 'translate(0, 25vh)' }}
                animate={{ opacity: 1, transform: 'translate(0, 0)' }}
                transition={{ delay: 0.75 }}
            >
                {props.sections ?? props.children}
            </m.div>
        </m.div>
    );
}

export const makeGenericProject =
    (func: (props: { onExit: () => void; key: string }) => ReactNode) =>
    (exit: () => void, key: string): ReactNode =>
        func({
            onExit: exit,
            key,
        });
