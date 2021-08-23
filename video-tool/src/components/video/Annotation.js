import React, { useEffect } from 'react';
import Scene from '../canvas/Scene';

// FIXME initial size of bounding box?
function Annotation(props) {
    const { annotations, projectDispatch, currentFrame, videoDimensions } = props;
    const canvasRef = React.useRef();
    const sceneRef = React.useRef();

    useEffect(() => {
        sceneRef.current = new Scene(canvasRef.current.getContext('2d'))
    }, []);

    useEffect(() => {
        if (annotations) {
            const BBoxes = annotations
                .getBoundingBoxes(
                    currentFrame,
                    videoDimensions.width,
                    videoDimensions.height);

            sceneRef.current.updateBoundingBoxes(BBoxes);
        }

    }, [currentFrame, annotations, videoDimensions]);


    const handleMouseMove = (event) => {
        sceneRef.current.handleMouseMove(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    };

    const handleMouseDown = (event) => {
        props.pauseVideo();
        const selectID = sceneRef.current.handleMouseDown(event.nativeEvent.offsetX, event.nativeEvent.offsetY);

        projectDispatch({
            type: 'SET_SELECTED',
            payload: { key: selectID }
        })
    };

    const handleMouseUp = () => {
        const update = sceneRef.current.handleMouseUp();

        if (update) {
            projectDispatch({
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
            width={videoDimensions.width}
            height={videoDimensions.height}>
        </canvas>
    );
}
export default Annotation;