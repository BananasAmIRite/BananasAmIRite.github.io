import { useContext, useEffect } from 'react';
import { BGAnimationContext } from '../../App';

// NOTE: ALL pages must specify a background animation, or otherwise it'll use the one that was previously there...
// ensures smoother transitions between different pages since before we would have to do a default background cleanup on all non-default pages
// but now it's only done if the page wants a different animation
export default function DefaultBackgroundAnimation() {
    const { setAnimateFunc, bgAnimRef } = useContext(BGAnimationContext);
    useEffect(() => {
        bgAnimRef?.current?.circleList.forEach((e) => e.toNaturalPosition());
        setAnimateFunc(null);
    }, []);
    return <></>;
}
