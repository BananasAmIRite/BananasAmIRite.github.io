import { CSSProperties, ReactNode } from 'react';

export default function ContentContainer(props: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '5%',
                ...props.style,
            }}
        >
            {props.children}
        </div>
    );
}
