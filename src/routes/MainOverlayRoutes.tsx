import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ProjectsPage, { preloadProjectImages } from '../pages/ProjectsPage';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AboutPage from '../pages/AboutPage';
import AboutMe from '../pages/about/AboutMe';
import { AboutResume } from '../pages/about/AboutResume';
import PongGamePage from '../pages/PongGamePage';

export default function AnimatedRoutes() {
    const location = useLocation();

    // Once the current page has settled, warm the Projects page images in the background.
    useEffect(() => {
        const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
        const cancel = window.cancelIdleCallback ?? window.clearTimeout;
        const handle = idle(() => preloadProjectImages());
        return () => cancel(handle);
    }, []);
    return (
        <AnimatePresence mode='wait' initial={false}>
            <Routes location={location} key={`MAIN-${location.pathname}`}>
                <Route path='/' element={<MainPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/about/me' element={<AboutMe />} />
                <Route path='/about/resume' element={<AboutResume />} />
                <Route path='/pong' element={<PongGamePage />} />
                <Route path='/projects' element={<ProjectsPage />} />
            </Routes>
        </AnimatePresence>
    );
}
