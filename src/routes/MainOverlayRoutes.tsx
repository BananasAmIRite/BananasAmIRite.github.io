import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ProjectsPage from '../pages/ProjectsPage';
import { AnimatePresence } from 'framer-motion';
import AboutPage from '../pages/AboutPage';
import AboutBadminton from '../pages/about/AboutBadminton';

export default function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={`MAIN-${location.pathname}`}>
                <Route path='/' element={<MainPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/about/badminton' element={<AboutBadminton />} />
                <Route path='/projects' element={<ProjectsPage />} />
                {/* <Route path='/contact' element={<ContactPage />} /> */}
            </Routes>
        </AnimatePresence>
    );
}
