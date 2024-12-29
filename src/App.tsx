import './App.css';
import { HashRouter } from 'react-router-dom';
import './colors/palette.scss';
import MainOverlayRoutes from './routes/MainOverlayRoutes';
import { NavbarItem } from './components/navbar/DesktopNavbar';
import { Dispatch, RefObject, createContext, useEffect, useRef, useState } from 'react';
import CoolBackgroundAnimation, {
    BackgroundCircle,
    InterUpdateFunction,
} from './components/animations/CoolBackgroundAnimation';
import Navbar from './components/navbar/Navbar';

export const BGAnimationContext = createContext<{
    animateFunc: InterUpdateFunction | null;
    setAnimateFunc: Dispatch<InterUpdateFunction | null>;
    bgAnimRef: RefObject<{ circleList: BackgroundCircle[] }>;
}>({
    animateFunc: () => {},
    setAnimateFunc: () => {},
    bgAnimRef: { current: { circleList: [] } },
});

function App() {
    const [scrolledDown, setScrolledDown] = useState(false);

    const [bgFunc, setBgFunc] = useState<InterUpdateFunction | null>(null);

    const bgAnimRef = useRef<{ circleList: BackgroundCircle[] }>(null);

    const handleScroll = () => {
        const position = window.scrollY ?? 0;
        setScrolledDown(position > 0.1 * window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <BGAnimationContext.Provider
            value={{ animateFunc: bgFunc, setAnimateFunc: (f) => setBgFunc(() => f), bgAnimRef }}
        >
            <HashRouter>
                <div>
                    <Navbar showBg={scrolledDown}>
                        <NavbarItem path={'/'} title={'Home'}></NavbarItem>
                        <NavbarItem path={'/about'} title={'About Me'}></NavbarItem>
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
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'fixed',
                                // zIndex: '-1',
                            }}
                        >
                            <CoolBackgroundAnimation interUpdateFrame={bgFunc} ref={bgAnimRef} />
                        </div>
                        <MainOverlayRoutes />
                    </div>
                </div>
            </HashRouter>
        </BGAnimationContext.Provider>
    );
}

export default App;
