import { useEffect, useRef, useState } from 'react';

// Modified from
// https://blog.sethcorker.com/resize-observer-api
export const useDimensions = (ref) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const observerRef = useRef(new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width: width, height: height });
    }));

    useEffect(() => {
        const observer = observerRef.current;
        const element = ref.current
        if (ref.current) {
            observer.observe(element);
        }

        return () => {
            observer.unobserve(element);
        }
    }, [observerRef, ref]);
    console.log("USE", dimensions);
    return dimensions;
}