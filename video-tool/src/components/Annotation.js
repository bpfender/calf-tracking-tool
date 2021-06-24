import React, { useEffect } from 'react';
import BoundingBox from './canvas/BoundingBox';
import Scene from './canvas/Scene';

import { BB2 } from './canvas/BoundingBox2';

function Annotation(props) {
    const canvasRef = React.useRef();
    const sceneRef = React.useRef();
    const scene = sceneRef.current;

    const BBox = new BB2(400, 300, 120, 120, 0, 'blue');
    const BBox2 = new BB2(200, 100, 50, 70, 80);
    const BBox3 = new BB2(50, 70, 55, 75, 0);
    const BBoxes = [BBox, BBox2, BBox3];
    const test = new BB2(400, 300, 120, 120, 45);


    useEffect(() => {
        sceneRef.current = new Scene(canvasRef.current.getContext('2d'), BBoxes);


    }, [canvasRef]);


    const handleMouseMove = (event) => {
        scene.handleMouseMove(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
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