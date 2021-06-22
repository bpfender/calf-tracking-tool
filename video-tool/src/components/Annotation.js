import React, { useEffect } from 'react';
import BoundingBox from './canvas/BoundingBox';
import Scene from './canvas/Scene';

import { BB2 } from './canvas/BoundingBox2';

function Annotation(props) {
    const canvasRef = React.useRef();
    const sceneRef = React.useRef();
    const scene = sceneRef.current;

    const BBox = new BoundingBox(400, 300, 120, 120, 0, 'blue');
    const test = new BB2(400, 300, 120, 120, 45);


    useEffect(() => {
        sceneRef.current = new Scene(canvasRef.current.getContext('2d'), BBox);

        sceneRef.current.context.setTransform(1, 0, 0, 1, 0, 0);
        test.draw(canvasRef.current.getContext('2d'));

        test.handles[3].setPositionHandleDirect(400, 300);
        test.draw(canvasRef.current.getContext('2d'));

    }, [canvasRef]);


    const handleMouseMove = (event) => {
        scene.handleMouseMove(event.nativeEvent);
    };


    const handleMouseDown = (event) => {
        scene.handleMouseDown(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    const handleMouseUp = () => {
        scene.handleMouseUp();
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