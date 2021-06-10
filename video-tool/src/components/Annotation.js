import React, { useEffect } from 'react';
import { drawRectangle, detect } from './annotation/annotation';

function Annotation(props) {
    const canvasRef = React.useRef();


    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        drawRectangle(context);
    }, [canvasRef]);


    return (
        <canvas
            ref={canvasRef}
            onMouseMove={(event) => { detect(event.nativeEvent) }}
            id="annotation-canvas"
            width="800px"
            height="600px">
        </canvas>
    );
}

export default Annotation;