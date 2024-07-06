import { useEffect, useState } from 'react';
import useTypedText from '../hooks/useTypedText';
import { Parallax, ParallaxBanner, useParallax } from 'react-scroll-parallax';
import { SpringValue, animated, useScroll } from 'react-spring';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';
import AboutPage from './AboutPage';
import { HashLink } from 'react-router-hash-link';

function MainPage() {
    const [scroll, setScroll] = useState(0);

    const [startTypedText, txt] = useTypedText({
        text: "Hey, I'm Jason!",
    });

    useEffect(() => {
        const onScroll = () => setScroll(window.scrollY);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        setScroll(window.scrollY);
        startTypedText();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, transform: 'translate(0px, -100px)' }}
            animate={{ opacity: 1, transform: 'translate(0px, 0px)' }}
            exit={{ opacity: 0, transform: 'translate(0px, 100px)' }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                }}
                id='home-intro'
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        zIndex: '100',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1 style={{ fontSize: 64, alignSelf: 'flex-start' }}>{txt}</h1>
                    <h2>I dabble in web design, backend design, games, and robotics. </h2>

                    <NavLink style={{ textDecoration: 'underline', fontSize: '36px' }} to='/projects'>
                        See My Projects
                    </NavLink>
                    {/* <LinkNavBar objects={navBarObjects} /> */}
                </div>

                <div
                    style={{
                        width: '100%',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        bottom: '20px',

                        transition: 'opacity 0.5s, translate 0.5s',

                        translate: `0px ${scroll <= 40 ? '0' : '-10'}vh`,

                        opacity: scroll <= 40 ? 1 : 0,
                        userSelect: 'none',
                    }}
                >
                    <ScrollIndicator width={15 * 1.25} height={25 * 1.25} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        transition: 'opacity 0.5s, translate 0.5s',
                        height: '30px',
                        zIndex: 10,
                        opacity: scroll <= 40 ? 1 : 0,
                        translate: `0px ${scroll <= 40 ? '0' : '-10'}vh`,
                        position: 'absolute',
                        bottom: '5%',
                    }}
                >
                    <a style={{ fontSize: '24px' }} href='https://github.com/BananasAmIRite'>
                        Github
                    </a>
                    <a style={{ fontSize: '24px' }} href='mailto:jasony1230@gmail.com'>
                        Email
                    </a>
                </div>
            </div>

            <div style={{ width: '100%', height: '100vh', backgroundColor: 'transparent' }} id='about'>
                <AboutPage />
            </div>
        </motion.div>
        // {/* <div
        //     style={{
        //         height: '100vh',
        //         width: '100%',
        //         backgroundColor: '#2D3FFF',
        //         position: 'relative',
        //         padding: '10%',
        //     }}
        //     // translateY={['0vh', '-100vh', 'easeInOut']}
        //     // easing={[0.1, 0.5, 0.9]}
        // ></div> */}
    );
}

export default MainPage;
