import './App.css';
import { HashRouter } from 'react-router-dom';

import './colors/palette.scss';
import MainOverlayRoutes from './routes/MainOverlayRoutes';
import Navbar, { NavbarItem } from './components/Navbar';
import { useEffect, useRef, useState } from 'react';
import CoolBackgroundAnimation from './components/CoolBackgroundAnimation';

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
            <HashRouter>
                <div>
                    <Navbar showBg={scrolledDown}>
                        <NavbarItem path={'/'} title={'Home'}></NavbarItem>
                        {/* <NavbarItem path={'/about'} title={'About Me'}></NavbarItem> */}
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
            </HashRouter>
        </>
    );
}

export default App;
