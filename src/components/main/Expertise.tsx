import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useMediaQuery } from 'react-responsive';
import { AnimateChangeInHeight } from '../util/AnimateChangeInheight';

const projVariant = {
    open: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: 0.25 + i * 0.2 },
    }),
    closed: {
        x: -50,
        opacity: 0,
    },
    preClosed: {
        x: -50,
        opacity: 0,
    },
};

export function Expertise(props: { children?: ReactNode; projects: { to: string; title: string }[] }) {
    const [open, setOpen] = useState(false);

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

    return (
        <motion.div
            layout
            style={{
                backgroundColor: 'var(--bs-gray-900)',
                color: 'white',
                padding: '20px',
                borderRadius: '20px',
                position: 'relative',
                ...(isSmallScreen
                    ? {
                          flexGrow: 1,
                      }
                    : { flex: '1 1 25%' }),
                overflow: 'hidden',
                cursor: 'pointer',
                maxWidth: isSmallScreen ? '100%' : '33%',
            }}
            initial={'preClosed'}
            whileInView={open ? 'open' : 'closed'}
            onClick={() => setOpen(!open)}
            variants={{
                open: {
                    x: 0,
                    opacity: 1,
                },
                closed: {
                    x: 0,
                    opacity: 1,
                },
                preClosed: {
                    x: -50,
                    opacity: 0,
                },
            }}
        >
            <motion.div layout='position' style={{ height: 'auto' }}>
                {props.children}
            </motion.div>

            <ExpertiseProjects projects={props.projects} />
        </motion.div>
    );
}

export function ExpertiseBody(props: { title: string; blurb: string }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h2 style={{ width: 'fit-content', position: 'relative' }}>{props.title}</h2>
            <div>
                <p>{props.blurb}</p>
            </div>
        </div>
    );
}

export function ExpertiseContainer(props: { children?: ReactNode }) {
    const isBigScreen = useMediaQuery({ query: '(max-width: 800px)' });

    return (
        <div
            style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                alignSelf: 'center',
                flexDirection: isBigScreen ? 'column' : 'row',
                justifyContent: 'center',
                marginTop: '50px',
                gap: '50px',
                flexWrap: 'wrap',
                alignItems: 'start',
            }}
        >
            {props.children}
        </div>
    );
}

export function ExpertiseProjects(props: { projects: { to: string; title: string }[] }) {
    return (
        <AnimateChangeInHeight>
            <motion.div
                style={{
                    width: '100%',
                    height: 'fit-content',
                    display: 'none',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    paddingTop: '5%',
                    paddingBottom: '5%',
                }}
                variants={{
                    closed: {
                        display: 'none',
                    },
                    open: {
                        display: 'flex',
                    },
                }}
            >
                <motion.div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                    }}
                    variants={{
                        closed: {},
                        open: {
                            transition: {
                                staggerChildren: 0.2,
                                duration: 0.5,
                            },
                        },
                    }}
                >
                    {props.projects.map((e, i) => (
                        <motion.div variants={projVariant} custom={i} key={i}>
                            <ExpertiseProject to={e.to} title={e.title} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </AnimateChangeInHeight>
    );
}

export function ExpertiseProject(props: { to: string; title: string }) {
    return (
        <HashLink to={`/projects#${props.to}`} style={{ textDecoration: 'none' }}>
            <motion.div
                style={{
                    borderRadius: '40px',
                    width: '80%',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '20px',
                    backgroundColor: 'var(--bs-gray-800)',
                    paddingLeft: '20px',
                    alignItems: 'center',
                    display: 'flex',
                    margin: 'auto',
                    textDecoration: 'none',
                }}
                whileHover={{
                    backgroundColor: 'var(--bs-gray-700)',
                }}
            >
                {props.title}
            </motion.div>
        </HashLink>
    );
}
