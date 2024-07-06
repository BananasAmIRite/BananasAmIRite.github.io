import { ReactNode } from 'react';
import { motion as m, stagger } from 'framer-motion';
import CoolLink from '../CoolLink';

export interface ProjectPageProps {
    title: string;
    titleChildren?: ReactNode;
    children?: ReactNode;
    onExit?: () => void;
}

export default function GenericProjectPage(props: ProjectPageProps) {
    return (
        <m.div
            style={{
                width: '100%',
                minHeight: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 100,
                backgroundColor: 'var(--bs-gray-700)',
                height: '100%',
                overflow: 'visible',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // transition={{ staggerChildren: 0.5 }}
        >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <m.div
                    style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'var(--bs-gray-900)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    initial={{ opacity: 0, transform: 'translate(0, -25vh)' }}
                    animate={{ opacity: 1, transform: 'translate(0, 0)' }}
                    transition={{ delay: 0.25 }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            backgroundColor: 'transparent',
                            width: '100px',
                            height: '30px',
                        }}
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
                    </div>
                    <h1 style={{ fontSize: '64px', color: 'var(--bs-gray-100)' }}>{props.title}</h1>
                </m.div>
                <m.div
                    style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'var(--bs-gray-800)',
                    }}
                    initial={{ opacity: 0, transform: 'translate(0, 25vh)' }}
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
                {props.children}
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
