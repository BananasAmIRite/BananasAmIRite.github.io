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
import DefaultBackgroundAnimation from '../components/animations/DefaultBackgroundAnimation';
import Robo2025Data from './projects/robo-2025/Robo2025Project';
import PeppersGhostData from './projects/peppers-ghost/PeppersGhostProject';
import SphinxData from './projects/sphinx/SphinxProject';
import DroneData from './projects/drone/Drone';
import { ProjectTag, ProjectTagList } from '../components/ProjectTag';
import AsteriaData from './projects/asteria/Asteria';

export interface ProjectBlurb {
    id: string;
    title: string;
    blurb: ReactNode;
    image?: string;
    projPage?: (onExit: () => void, key: string) => ReactNode;
    color?: string;
    hoverColor?: string;
    allowReadMore?: boolean; 
    tags?: ProjectTag[];
}

const projectBlurbs: ProjectBlurb[] = [
    AsteriaData,
    DroneData, 
    SphinxData,
    PeppersGhostData,
    AttdTrkrData,
    // RoboSimulateData,
    Peddie2023Data,
    Robo2025Data,
    Robo2024Data,
    Robo2023Data,
    NaturalSelectionData,
];

// Only offer filters for tags that at least one project actually uses, in enum order.
const usedTags = Object.values(ProjectTag).filter((t) => projectBlurbs.some((p) => p.tags?.includes(t)));

// Held so the browser keeps the decoded images around instead of garbage-collecting them.
const preloadedImages: HTMLImageElement[] = [];

/**
 * Download and decode every project card image in the background, so opening the Projects page
 * doesn't stall on them. Safe to call more than once.
 */
export function preloadProjectImages() {
    if (preloadedImages.length > 0) return;
    const sources = projectBlurbs.map((p) => p.image).filter((s): s is string => !!s);
    for (const src of sources.filter((s, i) => sources.indexOf(s) === i)) {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
        img.decode?.().catch(() => {}); // decode off the main thread; ignore failures (e.g. 404)
        preloadedImages.push(img);
    }
}

export default function ProjectsPage() {
    const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([]);
    // A project is shown if it has any of the selected tags; no selection shows everything.
    const visibleBlurbs =
        selectedTags.length === 0
            ? projectBlurbs
            : projectBlurbs.filter((p) => p.tags?.some((t) => selectedTags.includes(t)));

    const [viewingProject, setViewingProj] = useState<ReactNode | null>(null);
    const containerRef = useRef();
    const [viewingIndex, setViewingIndex] = useState<number>(-1);

    const location = useLocation();

    const goToProject = (index: number, e: ProjectBlurb) => {
        if (!e.projPage) return;
        if (!e.allowReadMore) return; 
        setViewingIndex(index);
        setTimeout(() => {
            if (!e.projPage) return;
            setViewingProj(
                e.projPage(() => {
                    setViewingProj(null);
                    setViewingIndex(-1);
                }, `PROJ-${e.id}`),
            );
        }, 500);
    };

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

    return (
        <>
            <DefaultBackgroundAnimation />
            <motion.div
                style={{
                    height: '100vh',
                    position: 'relative',
                    zIndex: viewingIndex !== -1 ? 60 : 0,
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
                    // remount on filter change so the active card and scroll position reset
                    key={selectedTags.join(',')}
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
                    cards={visibleBlurbs.map((e, i) => {
                        const colors = {
                            ...(e.color !== undefined && { bgColor: e.color }),
                            ...(e.hoverColor !== undefined && { bgHoverColor: e.hoverColor }),
                        };

                        return (
                            <ScrollCard
                                id={e.id}
                                image={e.image ?? ''}
                                title={
                                    <div style={{ alignSelf: 'start' }}>
                                        <h1
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {e.title}
                                        </h1>
                                        <ProjectTagList tags={e.tags} />
                                    </div>
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
                                expanded={viewingIndex === i}
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
