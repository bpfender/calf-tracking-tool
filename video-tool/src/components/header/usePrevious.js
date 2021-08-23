import { useEffect, useRef } from "react";

export function usePrevious(prev) {
    const prevRef = useRef(null);

    // Use effect only invoked after render
    useEffect(() => {
        prevRef.current = prev;
    })

    return prevRef.current;
}