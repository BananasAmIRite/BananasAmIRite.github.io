import { useEffect } from 'react';

export function AboutResume() {
    useEffect(() => {
        window.location.replace('/about/resume/Resume.pdf');
    }, []);

    return (
        <>
            {/* <DefaultBackgroundAnimation />
            <WorkInProgress /> */}
        </>
    );
}
