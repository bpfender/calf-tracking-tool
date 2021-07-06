import React, { useEffect } from 'react';
import { getBoundingBoxes } from './annotations/Annotations';
import BoundingBox from './canvas/BoundingBox';
import Scene from './canvas/Scene';

function Annotation(props) {
    const { annotations, playerState } = props;

    const canvasRef = React.useRef();
    const sceneRef = React.useRef();


    const BBox = new BoundingBox(400, 300, 120, 120, 0, 'blue');
    const BBox2 = new BoundingBox(200, 100, 50, 70, 80);
    const BBox3 = new BoundingBox(50, 70, 55, 75, 130);
    //const BBoxes = [BBox, BBox2, BBox3];

    useEffect(() => {
        sceneRef.current = new Scene(canvasRef.current.getContext('2d'))
    }, [canvasRef]);


    useEffect(() => {
        const BBoxes = getBoundingBoxes(annotations, playerState.currentFrame);
        sceneRef.current.addObjects(BBoxes);
    }, [playerState.currentFrame, annotations]);

    const handleMouseMove = (event) => {
        sceneRef.current.handleMouseMove(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    const handleMouseDown = (event) => {
        sceneRef.current.handleMouseDown(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    const handleMouseUp = () => {
        sceneRef.current.handleMouseUp();
    };

    return (
        <canvas
            className={props.className}
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            width="800px"
            height="600px">
        </canvas>
    );
}
export default Annotation;