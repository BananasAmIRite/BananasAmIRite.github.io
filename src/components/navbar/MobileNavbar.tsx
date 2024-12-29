import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MobileNavbar(props: { children?: ReactNode }) {
    const [opened, setOpened] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpened(false);
    }, [location]);

    return (
        <>
            <motion.div animate={opened ? 'open' : 'closed'} initial={'closed'}>
                <motion.button
                    style={{
                        position: 'fixed',
                        right: '10px',
                        top: '10px',
                        borderRadius: '5px',
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'var(--bs-gray-900)',
                        zIndex: 100,
                        border: '1px solid var(--bs-gray-100)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={() => setOpened((a) => !a)}
                >
                    <svg width='23' height='23' viewBox='0 0 23 23'>
                        <Path
                            variants={{
                                closed: { d: 'M 2 2.5 L 20 2.5' },
                                open: { d: 'M 3 16.5 L 17 2.5' },
                            }}
                        />
                        <Path
                            d='M 2 9.423 L 20 9.423'
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            transition={{ duration: 0.1 }}
                        />
                        <Path
                            variants={{
                                closed: { d: 'M 2 16.346 L 20 16.346' },
                                open: { d: 'M 3 2.5 L 17 16.346' },
                            }}
                        />
                    </svg>
                </motion.button>
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        backgroundColor: 'var(--bs-gray-900)',
                        transition: 'background-color 0.5s',
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        padding: '20px',
                        left: 0,
                        top: 0,
                        zIndex: 50,
                    }}
                    variants={{
                        closed: { x: '-100%' },
                        open: { x: 0 },
                    }}
                    initial={false}
                    transition={{
                        duration: 0.5,
                        x: {
                            damping: 0,
                        },
                    }}
                >
                    {props.children}
                </motion.div>
            </motion.div>
        </>
    );
}

const Path = (props: any) => (
    <motion.path fill='transparent' strokeWidth='3' stroke='white' strokeLinecap='round' {...props} />
);
