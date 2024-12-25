import { AnimatePresence, motion } from 'framer-motion';
import { ScrollCard, ScrollCardContainer } from '../components/ScrollCard';
import { ReactNode, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AttdTrkrData from './projects/attd-trkr/AttdTrkrProject';
import Robo2023Data from './projects/robo-2023/Robo2023Project';
import Robo2024Data from './projects/robo-2024/Robo2024Project';
import RoboSimulateData from './projects/robo-simulate/RoboSimulateProject';
import NaturalSelectionData from './projects/nss/NaturalSelectionProject';
import Peddie2023Data from './projects/peddie-2023/Peddie2023Project';

export interface ProjectBlurb {
    id: string;
    title: string;
    blurb: ReactNode;
    image?: string;
    projPage?: (onExit: () => void, key: string) => ReactNode;
    color?: string;
    hoverColor?: string;
}

const projectBlurbs: ProjectBlurb[] = [
    AttdTrkrData,
    RoboSimulateData,
    Peddie2023Data,
    Robo2023Data,
    Robo2024Data,
    NaturalSelectionData,
];

export default function ProjectsPage() {
    const [viewingProject, setViewingProj] = useState<ReactNode | null>(null);
    const containerRef = useRef();
    const [viewingIndex, setViewingIndex] = useState<number>(-1);

    const location = useLocation();

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
                            marginLeft: '2vw',
                            marginRight: '2vw',
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
