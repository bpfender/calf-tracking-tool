import React, { useEffect } from 'react';
import { getBoundingBoxes } from './annotations/Annotations';
import Scene from './canvas/Scene';


// FIXME canvas resizing and scaling
function Annotation(props) {
    const { annotations, annotationDispatch, currentFrame } = props;
    const canvasRef = React.useRef();
    const sceneRef = React.useRef();

    useEffect(() => {
        sceneRef.current = new Scene(canvasRef.current.getContext('2d'))
    }, [canvasRef, annotationDispatch]);

    useEffect(() => {
        const BBoxes = getBoundingBoxes(annotations, currentFrame);
        sceneRef.current.updateBoundingBoxes(BBoxes);
    }, [currentFrame, annotations]);

    const handleMouseMove = (event) => {
        sceneRef.current.handleMouseMove(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    // FIXME mouse click should pause playback really
    const handleMouseDown = (event) => {
        props.pauseVideo();
        const selectID = sceneRef.current.handleMouseDown(event.nativeEvent.offsetX, event.nativeEvent.offsetY);

        annotationDispatch({
            type: 'SET_SELECTED',
            payload: { key: selectID }
        })
    };

    const handleMouseUp = () => {
        // FIXME not happy about this as return value
        const update = sceneRef.current.handleMouseUp();

        if (update) {
            annotationDispatch({
                type: 'SET_FRAME_LABEL',
                payload: { key: update.key, frame: currentFrame, label: update.label }
            });
        }
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