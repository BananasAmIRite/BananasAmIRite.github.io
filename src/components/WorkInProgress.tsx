import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function WorkInProgress() {
    return (
        <motion.div
            style={{
                padding: '10%',
                color: 'white',
                position: 'relative',
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{ opacity: 0 }}
        >
            <h2>Work in progress!</h2>
            <br />
            <br />
            In the meantime, enjoy <Link to='/pong'>this game</Link> of pong!
        </motion.div>
    );
}
