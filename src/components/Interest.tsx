import { CSSProperties, useState } from 'react';
import { motion as m } from 'framer-motion';

export default function Interest(props: {
    style?: CSSProperties;
    hoverStyle?: CSSProperties;
    originalHeight: string | number;
    hoverHeight: string | number;
    accentColor: string;
    title: string;
}) {
    const [hovering, setHovering] = useState(false);

    const style = {
        borderRadius: '10px',
        height: props.originalHeight,
        ...props.style,
        ...(hovering ? props.hoverStyle : {}),
    };

    return (
        <m.div
            style={style}
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            whileHover={{ height: props.hoverHeight, width: '400px' }}
            transition={{
                duration: 0.5,
            }}
            // transition={{ type: 'spring', stiffness: 200 }}
        >
            <div>
                <h1 style={{ width: 'fit-content', position: 'relative', margin: '0 inherit' }}>
                    <span style={{ zIndex: 2 }}>{props.title}</span>
                    <div
                        style={{
                            position: 'absolute',
                            height: '10px',
                            width: '100%',
                            backgroundColor: props.accentColor,
                            bottom: '-2px',
                            zIndex: 1,
                        }}
                    ></div>
                </h1>
            </div>
        </m.div>
    );
}
