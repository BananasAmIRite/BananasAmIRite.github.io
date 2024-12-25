import React, {
    CSSProperties,
    ReactElement,
    RefObject,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { isChrome, isChromium } from 'react-device-detect';

export interface ScrollCardProps {
    id: string;
    image: string;
    title: React.ReactNode;
    body: React.ReactNode;
    onClick?: () => void;
    bgColor?: string;
    bgHoverColor?: string;
    active?: boolean;
    imageStyle?: CSSProperties;
    cardStyle?: CSSProperties;
    cardHoverStyle?: CSSProperties;
    cardActiveStyle?: CSSProperties;

    widthOverride?: string | number;
    heightOverride?: string | number;
}

export function ScrollCard(props: ScrollCardProps) {
    const [hovering, setHovering] = useState<boolean>(false);

    const baseStyle: CSSProperties = {
        borderRadius: '20px',
        backgroundColor: props.bgColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',

        userSelect: 'none',
        ...props.cardStyle,
    };

    let containerStyles = baseStyle;
    if (hovering)
        containerStyles = { ...containerStyles, backgroundColor: props.bgHoverColor, ...props.cardHoverStyle };
    if (props.active) containerStyles = { ...containerStyles, ...props.cardActiveStyle };

    return (
        <div
            style={containerStyles}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => {
                if (!props.active) return; // don't do anything if not active
                if (props.onClick) props.onClick();
            }}
            id={props.id}
        >
            <div
                style={{
                    width: '100%',
                    height: '45%',
                }}
            >
                {props.image ? (
                    <img
                        src={props.image}
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(50%)',
                            ...props.imageStyle,
                        }}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div
                style={{
                    // width: '100%',
                    position: 'absolute',
                    top: '33%',
                    height: '55%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '5%',
                }}
            >
                {props.title}
                {props.body}
            </div>
        </div>
    );
}

export interface ScrolLCardContainerProps {
    cards: ReactElement<ScrollCardProps>[];
    containerStyle?: CSSProperties;
    cardWidth: string | number;
    cardHeight: string | number;
    sideReductionPercent: number;
    cardStyles: {
        bgColor: string;
        bgHoverColor: string;
        cardStyle?: CSSProperties;
        cardHoverStyle?: CSSProperties;
        cardActiveStyle?: CSSProperties;
    };
}

const getScrollLengths = (
    container: RefObject<HTMLDivElement>,
    cardRefs: { current: (HTMLDivElement | null)[] }
): number[] => {
    const elementScrolls = cardRefs.current.map((e) => e?.scrollWidth ?? 0);

    const scrollLengths: number[] = [];

    for (let i = 0; i < cardRefs.current.length ?? 0; i++) {
        scrollLengths.push((scrollLengths[i - 1] ?? 0) + ((elementScrolls[i - 1] ?? 0) + (elementScrolls[i] ?? 0)) / 2);
    }
    return scrollLengths;
};

export const ScrollCardContainer = forwardRef((props: ScrolLCardContainerProps, _ref) => {
    const [active, setActive] = useState<number>(0);
    const [scrollLengths, setScrollLengths] = useState<number[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const container = useRef<HTMLDivElement>(null);

    useImperativeHandle(_ref, () => ({
        getActiveIndex: () => active,
    }));
    const onScroll = () => {
        // console.log('s', container.current?.scrollLeft);

        const scrollLengths = getScrollLengths(container, cardRefs);

        const currentScroll = container.current?.scrollLeft ?? 0;

        const distances = scrollLengths.map((e) => Math.abs(e - currentScroll));

        const lowestNum = Math.min(...distances);

        const lowestIndex = distances.indexOf(Math.min(...distances));
        setScrollLengths(scrollLengths);

        // SKILL ISSUE: page jumping caused by this issue: https://issues.chromium.org/issues/327554079
        if (lowestNum <= 2 || !(isChromium || isChrome)) setActive(lowestIndex);
    };

    useEffect(() => {
        container.current?.addEventListener('scroll', onScroll);
        onScroll();
        return () => {
            container.current?.removeEventListener('scroll', onScroll);
        };
    }, []);

    // useEffect(() => {
    // onScroll();
    // container.current?.scrollTo(scrollLengths[active], 0);
    // }, [active]);

    const scrollTo = (index: number) => {
        onScroll();

        container.current?.scrollTo({
            left: scrollLengths[index],
            behavior: 'smooth',
        });
    };

    return (
        <div
            ref={container}
            style={{
                overflowX: 'scroll',
                overflowY: 'hidden',
                scrollbarWidth: 'none',
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'center',
                width: '100%',
                height: '100%',
                alignItems: 'center',

                scrollSnapType: 'x mandatory',
                paddingLeft: '50%',
                paddingRight: '50%',
            }}
        >
            {props.cards.map((e, i) => {
                let width: string | number = `calc(${props.cardWidth} * ${
                    // changing width throws scrolling in for a fit (also this looks a bit better)
                    1
                    // (100 - props.sideReductionPercent * (active === i ? 0 : 1)) / 100
                })`;
                let height: string | number = `calc(${props.cardHeight} * ${
                    (100 - props.sideReductionPercent * (active === i ? 0 : 1)) / 100
                })`;

                if (e.props.widthOverride && e.props.widthOverride !== 0) width = e.props.widthOverride;
                if (e.props.heightOverride && e.props.heightOverride !== 0) height = e.props.heightOverride;

                return (
                    <div
                        ref={(el) => (cardRefs.current[i] = el)}
                        key={i}
                        onClick={() => {
                            scrollTo(i);
                        }}
                    >
                        <ScrollCard
                            {...props.cardStyles}
                            {...e.props}
                            cardStyle={{
                                width: width,
                                height: height,

                                ...props.cardStyles.cardStyle,
                                ...e.props.cardStyle,

                                transition: `width 0.5s, height 0.5s, ${
                                    e.props.cardStyle?.transition ?? props.cardStyles.cardStyle?.transition
                                }`,

                                scrollSnapAlign: 'none center',
                            }}
                            active={active === i}
                        />
                    </div>
                );
            })}
        </div>
    );
});
