import React, { useEffect } from 'react';
import BoundingBox from './annotation/bounding-box';
import Context from './annotation/context';
import Scene from './annotation/scene';

function Annotation(props) {
    const canvasRef = React.useRef();

    const ctxRef = React.useRef();
    const sceneRef = React.useRef();

    const BBoxArray = [];
    BBoxArray.push(new BoundingBox(55, 150, 470, 310, 45, 'red'));
    BBoxArray.push(new BoundingBox(65, 65, 400, 300, 0, 'green'));
    BBoxArray.push(new BoundingBox(50, 50, 300, 250, 78, 'blue'));

    useEffect(() => {
        ctxRef.current = new Context(canvasRef.current.getContext('2d'));
        sceneRef.current = new Scene(BBoxArray, ctxRef.current);

        sceneRef.current.redrawScene();

    }, [canvasRef]);


    const handleMouseMove = (event) => {
        sceneRef.current.redrawScene();
    };


    const handleMouseDown = () => {
        sceneRef.current.redrawScene();
    };

    const handleMouseUp = () => {
        sceneRef.current.redrawScene();
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