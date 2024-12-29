import React, { ReactNode } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { useMediaQuery } from 'react-responsive';

export default function Navbar(props: { showBg: boolean; children?: ReactNode }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

    return isSmallScreen ? (
        <MobileNavbar>{props.children}</MobileNavbar>
    ) : (
        <DesktopNavbar showBg={props.showBg}>{props.children}</DesktopNavbar>
    );
}
