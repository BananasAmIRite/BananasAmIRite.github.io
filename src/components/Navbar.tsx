import React, { ReactNode, useEffect, useState } from 'react';
import CoolLink from './CoolLink';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { link } from 'fs';

export default function Navbar(props: { showBg: boolean; children?: ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: props.showBg ? 'var(--bs-gray-900)' : 'transparent',
                transition: 'background-color 0.5s',
                width: '100%',
                height: '40px',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 50,
            }}
        >
            {props.children}
        </div>
    );
}

export function NavbarItem(props: { path: string; title: string }) {
    const location = useLocation();

    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(location.pathname);
        console.log(location.search);
    }, [location]);

    return (
        <div style={{ color: 'var(--bs-gray-100)' }}>
            <Link to={props.path} style={{ textDecoration: 'none' }}>
                <CoolLink
                    style={{ fontSize: '18px', color: 'var(--bs-gray-100)' }}
                    decorHeight='2px'
                    active={pathname === props.path}
                    onClick={() => {}}
                >
                    {props.title}
                </CoolLink>
            </Link>
        </div>
    );
}

export function NavbarHashLink(props: { path: string; title: string }) {
    const linkHash = '#' + props.path.split('#').slice(1).join('#');
    const linkPath = props.path.split('#').slice(0, 1).join('');
    const location = useLocation();

    const [pathname, setPathname] = useState('');
    const [hash, setHash] = useState('');

    useEffect(() => {
        setPathname(location.pathname);
        setHash(location.hash);
    }, [location]);

    return (
        <div style={{ color: 'var(--bs-gray-100)', paddingTop: '1vh' }}>
            <HashLink to={props.path} style={{ textDecoration: 'none' }}>
                <CoolLink
                    style={{ fontSize: '18px', color: 'var(--bs-gray-100)' }}
                    decorHeight='2px'
                    active={pathname === linkPath && hash === linkHash}
                    onClick={() => {}}
                >
                    {props.title}
                </CoolLink>
            </HashLink>
        </div>
    );
}
