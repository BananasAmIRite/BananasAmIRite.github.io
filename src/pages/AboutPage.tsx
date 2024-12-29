import AboutBackgroundAnimation, { AboutPoint } from '../components/animations/AboutAnimation';
import { motion } from 'framer-motion';

const aboutPoints: AboutPoint[] = [
    {
        x: 0.25,
        y: 0.25,
        pointName: 'Who Am I?',
        pointTo: '/about/me',
    },
    {
        x: 0.5,
        y: 0.75,
        pointName: 'Resume',
        pointTo: '/about/resume',
    },
];

export default function AboutPage() {
    return (
        <motion.div>
            <div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        zIndex: '0',
                    }}
                >
                    <AboutBackgroundAnimation aboutPoints={aboutPoints} />
                </div>
            </div>
        </motion.div>
    );
}
