import React, { useEffect } from 'react';
import { drawRectangle, detectMouseOver, moveBBox } from './annotation/annotation';

function Annotation(props) {
    const canvasRef = React.useRef();
    let mouseDown = false;

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        drawRectangle(context);
    }, [canvasRef]);

    const handleMouseMove = (event) => {
        console.log("MOUSE MOVE");
        if (mouseDown === false) {
            detectMouseOver(event.nativeEvent);
        } else {
            moveBBox(event.nativeEvent);
        }
    };

    const handleMouseDown = () => {
        mouseDown = true;
    };

    const handleMouseUp = () => {
        mouseDown = false;
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            id="annotation-canvas"
            width="800px"
            height="600px">
        </canvas>
    );
}
export default Annotation;