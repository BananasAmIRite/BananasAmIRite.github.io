import { AnimatePresence, motion } from 'framer-motion';
import { ScrollCard, ScrollCardContainer } from '../components/ScrollCard';
import { ReactNode, useRef, useState } from 'react';
import { makeGenericProject } from '../components/project/GenericProjectPage';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Robo2023Project from './projects/robo-2023/Robo2023Project';
import Robo2024Project from './projects/robo-2024/Robo2024Project';
import AttdTrkrProject from './projects/attd-trkr/AttdTrkrProject';

interface ProjectBlurb {
    id: string;
    title: string;
    blurb: ReactNode;
    image?: string;
    projPage?: (onExit: () => void, key: string) => ReactNode;
    color?: string;
    hoverColor?: string;
}

const projectBlurbs: ProjectBlurb[] = [
    {
        id: 'attd-trkr',
        projPage: makeGenericProject(AttdTrkrProject),
        title: 'Attendance Tracker',

        // image: '/projects/attd-trkr/banner.jpg',
        blurb: (
            <>
                <p>
                    This project solves the issue of people not taking attendance on my robotics team. It is an Android
                    app that reads student ID cards through NFC IDs or barcodes and stores each instance of the scan in
                    a google sheet.
                </p>

                <a href='https://github.com/BananasAmIRite/robo-attendance-tracker'>View the Project</a>
            </>
        ),
    },

    {
        id: 'robo-2023',
        projPage: makeGenericProject(Robo2023Project),
        title: 'Lucy',

        image: '/projects/robo-2023/banner.jpg',
        blurb: (
            <>
                <p>
                    Lucy was the robot FRC team 321 created for the 2023 season of FRC, Charged Up, where robots were
                    tasked with scoring cones and cubes onto a set area. The software, programmed in Java, featured a
                    custom library for planning autonomous paths, various setpoints and modes for scoring the game
                    pieces.
                </p>

                <a href='https://github.com/RoboLancers/FRC-Main-2023'>View the Project</a>
            </>
        ),
    },
    {
        id: 'robo-2024',
        // projLinkTitle: 'robo-2024',
        title: 'LANCE-A-BOT',

        image: '/projects/robo-2024/banner.jpg',
        blurb: (
            <>
                <p>
                    LANCE-A-BOT was the robot FRC team 427 created for the 2024 season of FRC, Crescendo, where robots
                    had to score notes (orange foam rings) into different areas. The robot, which uses a swerve drive,
                    features multiple autonomous modes that accurately shoots notes and extensive driver-side automation
                    that allows drivers to focus on the game rather than the robot.
                </p>
                <a href='https://github.com/RoboLancers/FRC427-Main-2024'>View the Project</a>
            </>
        ),
        projPage: makeGenericProject(Robo2024Project),
    },
];

export default function ProjectsPage() {
    const [viewingProject, setViewingProj] = useState<ReactNode | null>(null);
    const containerRef = useRef();
    const [viewingIndex, setViewingIndex] = useState<number>(-1);

    const location = useLocation();

    // useEffect(() => {
    //     if (location.pathname !== )
    //     const projIndexFound = projectBlurbs.findIndex((e) => '#' + e.id === location.hash);
    //     if (projIndexFound !== -1) {
    //         goToProject(projIndexFound, projectBlurbs[projIndexFound]);
    //     }
    // }, [location]);

    const goToProject = (index: number, e: ProjectBlurb) => {
        // if (!e.projPage) return;
        // setViewingIndex(index);
        // setTimeout(() => {
        //     if (!e.projPage) return;
        //     setViewingProj(
        //         e.projPage(() => {
        //             setViewingProj(null);
        //             setViewingIndex(-1);
        //         }, `PROJ-${e.id}`)
        //     );
        // }, 500);
    };

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

    return (
        <>
            <motion.div
                style={{
                    height: '100vh',
                }}
                initial={
                    location.hash.length > 0
                        ? { opacity: 0, transform: 'translate(0, 0)' }
                        : { transform: 'translate(100vw, 0)', opacity: 1 }
                }
                animate={{ transform: 'translate(0, 0)', opacity: 1 }}
                exit={{ transform: 'translate(0, 100vh)', opacity: 1 }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
            >
                <ScrollCardContainer
                    ref={containerRef}
                    cardStyles={{
                        cardStyle: {
                            marginLeft: '50px',
                            marginRight: '50px',
                            transition: 'background-color 0.25s, border-radius 0.25s',
                            color: 'var(--bs-gray-100)',
                        },
                        cardHoverStyle: {
                            cursor: 'pointer',
                        },
                        bgColor: 'var(--bs-gray-800)',
                        bgHoverColor: 'var(--bs-gray-700)',
                        cardActiveStyle: {},
                    }}
                    cards={projectBlurbs.map((e, i) => {
                        const colors = {
                            ...(e.color !== undefined && { bgColor: e.color }),
                            ...(e.hoverColor !== undefined && { bgHoverColor: e.hoverColor }),
                        };

                        return (
                            <ScrollCard
                                id={e.id}
                                image={e.image ?? ''}
                                title={
                                    <h1
                                        style={{
                                            fontSize: '48px',
                                            alignSelf: 'start',
                                            fontWeight: 700,
                                            // letterSpacing: -1.5,
                                        }}
                                    >
                                        {e.title}
                                    </h1>
                                }
                                body={e.blurb}
                                onClick={() => {
                                    goToProject(i, e);
                                }}
                                cardStyle={
                                    viewingIndex === i
                                        ? { width: '100vw', height: '100vh', borderRadius: '0' }
                                        : viewingIndex !== -1
                                        ? { opacity: 0 }
                                        : {}
                                }
                                {...colors}
                            />
                        );
                    })}
                    cardWidth={isSmallScreen ? '80vw' : '60vw'}
                    cardHeight={'80vh'}
                    sideReductionPercent={50}
                />
            </motion.div>
            <AnimatePresence mode='wait'>{viewingProject === null ? <></> : viewingProject}</AnimatePresence>
        </>
    );
}
