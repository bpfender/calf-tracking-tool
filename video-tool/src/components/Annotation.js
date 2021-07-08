import React, { useEffect } from 'react';
import { getBoundingBoxes } from './annotations/Annotations';
import Scene from './canvas/Scene';

function Annotation(props) {
    const { annotations, annotationDispatch, playerState } = props;
    const canvasRef = React.useRef();
    const sceneRef = React.useRef();

    useEffect(() => {
        sceneRef.current = new Scene(canvasRef.current.getContext('2d'))
    }, [canvasRef]);

    useEffect(() => {
        const BBoxes = getBoundingBoxes(annotations, playerState.currentFrame);
        sceneRef.current.updateBoundingBoxes(BBoxes);
    }, [playerState.currentFrame, annotations]);

    const handleMouseMove = (event) => {
        sceneRef.current.handleMouseMove(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    // FIXME mouse click should pause playback really
    const handleMouseDown = (event) => {
        sceneRef.current.handleMouseDown(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    const handleMouseUp = () => {
        const bbox = sceneRef.current.handleMouseUp();
        const label = {
            x: bbox.x,
            y: bbox.y,
            w: bbox.width,
            h: bbox.height,
            rotation: bbox.rotation,
            labelled: true
        }
        annotationDispatch({
            type: 'SET_FRAME_LABEL',
            payload: { key: bbox.key, frame: playerState.currentFrame, label: label }
        });
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