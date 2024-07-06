import './App.css';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProjectsPage from './pages/ProjectsPage';

import './colors/palette.scss';
import MainOverlayRoutes from './routes/MainOverlayRoutes';
import Navbar, { NavbarHashLink, NavbarItem } from './components/Navbar';
import { useEffect, useRef, useState } from 'react';
import CoolBackgroundAnimation from './components/CoolBackgroundAnimation';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainPage />}>
            <Route path='projects' element={<ProjectsPage />} />
            {/* ... etc. */}
        </Route>
    )
);

function App() {
    const mainContainer = useRef<HTMLDivElement>(null);
    const [scrolledDown, setScrolledDown] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        const position = window.scrollY ?? 0;
        setScrollY(position);
        setScrolledDown(position > 40);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <>
            <BrowserRouter>
                <div>
                    <Navbar showBg={scrolledDown}>
                        <NavbarHashLink path={'/#home-intro'} title={'Home'}></NavbarHashLink>
                        <NavbarHashLink path={'/#about'} title={'About Me'}></NavbarHashLink>
                        <NavbarItem path={'/projects'} title={'Projects'}></NavbarItem>
                    </Navbar>
                    <div
                        style={{
                            width: '100%',
                            height: '100vh',
                            backgroundColor: 'black',
                            position: 'absolute',
                            overflow: 'visible',
                        }}
                        ref={mainContainer}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'fixed',
                                zIndex: '0',
                            }}
                        >
                            <CoolBackgroundAnimation />
                        </div>
                        <MainOverlayRoutes />
                    </div>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
