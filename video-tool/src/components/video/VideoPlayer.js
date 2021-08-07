import React from 'react';
import Annotation from './Annotation';
import Video from './Video';

export default function VideoPlayer(props) {
    const { videoRef,
        playerDispatch, playerState,
        annotations, annotationDispatch } = props;

    // TODO this needs to be set dynamically
    const style = {
        height: playerState.videoHeight + "px"
    };

    return (
        <div className="video-container">
            <div className="video-window-container"
                style={style}>
                <Video
                    className="video-window"
                    ref={videoRef}
                    playerDispatch={playerDispatch}
                    src={playerState.src}
                    fps={playerState.framerate}
                    vsync={playerState.vsync} />
                <Annotation
                    className="video-window annotation-overlay"
                    currentFrame={playerState.currentFrame}
                    annotations={annotations}
                    annotationDispatch={annotationDispatch}
                    pauseVideo={() => { videoRef.current.pause() }} />
            </div>
        </div>
    );
}