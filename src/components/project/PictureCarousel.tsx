import { CSSProperties, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export default function PictureCarousel(props: { style?: CSSProperties; images: string[] }) {
    const [hovering, setHovering] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

    const scrollTo = (index: number) => {
        if (!imgRefs.current || !imgRefs.current[index]) return;
        imgRefs.current[index]?.scrollIntoView({
            // block: 'center',
            // inline: 'center',
            behavior: 'smooth',
        });
    };

    const incIndex = () => {
        const newIndex = currentIndex + 1 >= props.images.length ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollTo(newIndex);
    };

    const decIndex = () => {
        const newIndex = currentIndex - 1 < 0 ? props.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        scrollTo(newIndex);
    };

    return (
        <div
            style={{
                position: 'relative',
                userSelect: 'none',
                ...props.style,
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'scroll',
                    scrollSnapType: 'x mandatory',
                    width: '100%',
                    height: '100%',
                }}
            >
                {props.images.map((e, i) => (
                    <img
                        ref={(el) => (imgRefs.current[i] = el)}
                        src={e}
                        key={i}
                        style={{
                            // width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            flex: '0 0 100%',

                            scrollSnapAlign: 'center center',
                        }}
                    />
                ))}
            </div>
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '100%',
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    margin: 'auto',
                    left: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    opacity: hovering ? 1 : 0,
                    transition: 'opacity 0.25s',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={decIndex}
            >
                <MdOutlineKeyboardArrowLeft color='black' size='32px' />
            </div>
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '100%',
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    margin: 'auto',
                    right: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    opacity: hovering ? 1 : 0,
                    transition: 'opacity 0.25s',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={incIndex}
            >
                <MdOutlineKeyboardArrowRight color='black' size='32px' />
            </div>
        </div>
    );
}
