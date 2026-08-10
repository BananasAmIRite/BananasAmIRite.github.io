import { CSSProperties, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import useTypedText from '../../hooks/useTypedText';
import { HashLink } from 'react-router-hash-link';

export default function AboutPointTooltip(props: {
    accentColor?: string;
    style?: CSSProperties;
    decorHeight?: string;
    text: string;
    to: string;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) {
    const [startTypedText, txt] = useTypedText({
        text: props.text,
    });

    useEffect(() => {
        // setInterval(() => startTypedText(), 5000);
        startTypedText();
    }, []);
    return (
        <HashLink to={props.to}>
            <m.div
                whileHover={{
                    opacity: 1,
                }}
                // trick where I superficially make the div larger to allow larger click area
                style={{ cursor: 'pointer', opacity: 0.5, paddingLeft: '2vw', paddingTop: '2vh' }}
                exit={{
                    opacity: 0,
                    x: '5vw',
                }}
                onHoverStart={props.onHoverStart}
                onHoverEnd={props.onHoverEnd}
            >
                <h4 style={{ width: 'fit-content', position: 'relative', margin: '0 inherit', ...props.style }}>
                    {txt}
                    <m.div
                        style={{
                            position: 'absolute',
                            height: props.decorHeight ?? '1px',
                            backgroundColor: props.accentColor ?? 'white',
                            bottom: '1px',
                            width: '100%',
                        }}
                        initial={{
                            width: 0,
                        }}
                        animate={{ width: '100%' }}
                    ></m.div>
                </h4>
            </m.div>
        </HashLink>
    );
}
