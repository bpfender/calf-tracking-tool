import { useEffect, useState } from 'react';

export function useKeydown() {
    const [key, setKey] = useState(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);
        return (() => {
            window.removeEventListener('keydown', handleKeydown);
        })
    }, []);

    const handleKeydown = (event) => {
        setKey(event);
    };

    const handleKeyup = () => {
        setKey(null);
    }

    return key;
}

export const keyCode = {
    enter: 13,
    backspace: 8,
    arrowRight: 39,
    arrowLeft: 37,
    space: 32,
    bracketRight: 221,
    bracketLeft: 219,
    c: 67,
    x: 88,
    z: 90,
    y: 89,
    comma: 188,
    dot: 190,
    semicolon: 186,
    apost: 192,
    s: 83,
    o: 79,
};