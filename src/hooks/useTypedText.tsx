import { useEffect, useState } from 'react';

export interface TypedTextProps {
    text: string;
    timeBetweenType?: number;
}

function useTypedText({ text, timeBetweenType = 100 }: TypedTextProps): [() => void, string] {
    const [started, setStarted] = useState(false);
    const [character, setCharacter] = useState(0);
    const [fText, setFText] = useState('');

    useEffect(() => {
        if (!started) return;
        const timeout = setTimeout(() => {
            if (character > text.length) return;
            setCharacter((c) => c + 1);
        }, timeBetweenType);
        return () => clearTimeout(timeout);
    }, [started, character, text.length, timeBetweenType]);

    useEffect(() => {
        setFText(`${text.slice(0, character)}${character < text.length ? '■' : ''}`);
    }, [character, fText]);

    const start = () => setStarted(true);

    return [start, fText];
}

export default useTypedText;
