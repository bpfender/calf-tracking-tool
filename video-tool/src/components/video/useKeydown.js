import { useEffect, useState } from 'react';

export function useKeydown() {
    const [key, setKey] = useState(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown)
        return (() => {
            window.removeEventListener('keydown', handleKeydown);
        })
    }, []);

    const handleKeydown = (event) => {
        setKey(event);
    };

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
};