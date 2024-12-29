import DefaultBackgroundAnimation from '../../components/animations/DefaultBackgroundAnimation';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AboutMe() {
    const [imageHovered, setImageHovered] = useState(false);

    const outerBlur = {
        open: {
            backdropFilter: 'blur(3px)',
            background: 'rgba(255, 255, 255, 0.1)',
            transition: {
                delayChildren: 0.5,
            },
        },
        closed: {
            backdropFilter: '0',
            background: 'rgba(255, 255, 255, 0)',
            transition: {
                delay: 0.5,
            },
        },
    };

    const leftBio = {
        closed: {
            opacity: 0,
            x: '-50%',
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                // bounce: 0,
            },
        },
    };

    const rightImage = {
        closed: {
            opacity: 0,
        },
        open: {
            opacity: 1,
        },
    };

    const imgArrow = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => {
            const delay = i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: 'spring', duration: 1.25, bounce: 0 },
                    opacity: { delay, duration: 0.01 },
                },
            };
        },
    };

    const imgText = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
        },
    };

    return (
        <>
            <DefaultBackgroundAnimation />
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                    padding: '5%',
                }}
                initial={'closed'}
                animate={'open'}
                exit={'closed'}
                variants={outerBlur}
            >
                <motion.div
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        justifyContent: 'space-between',
                    }}
                >
                    <motion.div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            flexGrow: 1,
                            padding: '5%',
                        }}
                        variants={leftBio}
                    >
                        <motion.h1>Hey, </motion.h1>
                        <motion.h5>
                            I'm Jason (a.k.a. BananasAmIRite on the interwebs)! I'm a developer who likes to make
                            simulations, backend applications, and occasionally, websites like this one. In my free
                            time, I enjoy playing badminton and looking at new tech.{' '}
                        </motion.h5>
                        <br />
                        <br />
                        <motion.div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '15px',
                            }}
                        >
                            <a href={'https://github.com/BananasAmIRite'}>
                                <FaGithub size={35} />
                            </a>
                            <a href={'https://www.instagram.com/bananasamirite/'}>
                                <FaInstagram size={35} />
                            </a>
                            <a href={'mailto:jasony1230@gmail.com'}>
                                <MdOutlineEmail size={35} />
                            </a>
                        </motion.div>
                    </motion.div>
                    <div
                        style={{
                            display: 'inline-block',
                            float: 'right',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <motion.img
                                src='./about/me/profile_pic.png'
                                style={{ borderRadius: '10px', height: '50%' }}
                                variants={rightImage}
                                onHoverStart={() => setImageHovered(true)}
                                onHoverEnd={() => setImageHovered(false)}
                            />

                            <div
                                style={{
                                    position: 'absolute',
                                    top: 'calc(75% - 50px)',
                                    left: '-150px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <motion.h5
                                    variants={imgText}
                                    initial={'hidden'}
                                    animate={imageHovered ? 'visible' : 'hidden'}
                                >
                                    That's me!
                                </motion.h5>
                                <motion.svg
                                    width='100'
                                    height='100'
                                    viewBox='0 0 300 300'
                                    initial={'hidden'}
                                    animate={imageHovered ? 'visible' : 'hidden'}
                                >
                                    <motion.path
                                        variants={imgArrow}
                                        stroke='#ffffff'
                                        stroke-width='5'
                                        fill='none'
                                        opacity='1'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        custom={0}
                                        d='M0,270 C 88,287 163,241 177,227 C 193,213 221,187 201,136 C 181,104 134,119 130,147 C 126,171 142,189 159,194 C 198,203 225,177 241,144 C 259,103 277,63 284,18'
                                    ></motion.path>
                                    <motion.path
                                        variants={imgArrow}
                                        stroke='#ffffff'
                                        stroke-width='5'
                                        fill='none'
                                        opacity='1'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M 284,18 L 250,40 M 284,18 L 300,55'
                                        custom={1}
                                    ></motion.path>
                                </motion.svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
