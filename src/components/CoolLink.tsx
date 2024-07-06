import { CSSProperties, ReactNode } from 'react';
import { motion as m, animate } from 'framer-motion';

export default function CoolLink(props: {
    active: boolean;
    children?: ReactNode;
    onClick?: () => void;
    accentColor?: string;
    style?: CSSProperties;
    decorHeight?: string;
}) {
    const decorMotion = {
        rest: { width: '0' },
        hover: {
            width: '100%',
        },
    };

    return (
        <m.div
            onClick={props.onClick}
            whileHover='hover'
            animate={props.active ? 'hover' : 'rest'}
            style={{ cursor: 'pointer' }}
        >
            <h2 style={{ width: 'fit-content', position: 'relative', margin: '0 inherit', ...props.style }}>
                {props.children}
                <m.div
                    style={{
                        position: 'absolute',
                        height: props.decorHeight ?? '5px',
                        width: props.active ? '100%' : '0',
                        backgroundColor: props.accentColor ?? 'white',
                        bottom: '2px',
                    }}
                    variants={decorMotion}
                ></m.div>
            </h2>
        </m.div>
    );
}
