import React, { useRef } from 'react';
import Video from './video/Video';
import ControlBar from './controls/ControlBar';
import Info from './Info';
import Annotation from './Annotation.js';
import "./Player.scss";
import { VideoBar } from './video/VideoBar';

//FIXME position of video isn't quite right yet. Not sure what's happen

function Player(props) {
    const { annotations, annotationDispatch, playerState, playerDispatch } = props;

    // TODO useeffect to mount video?
    const videoRef = useRef(null);

    // TODO this needs to be set dynamically
    const style = {
        height: playerState.videoHeight + "px"
    };

    return (
        <div className={props.className}>
            <div className="video-content">
                <VideoBar
                    framerate={playerState.framerate}
                    videoWidth={playerState.videoWidth}
                    videoHeight={playerState.videoHeight} />
                <div className="video-container">
                    <div className="video-window-container"
                        style={style}>
                        <Video
                            className="video-window"
                            ref={videoRef}
                            playerDispatch={playerDispatch}
                            src={playerState.src}
                            fps={playerState.framerate} />
                        <Annotation
                            className="video-window annotation-overlay"
                            currentFrame={playerState.currentFrame}
                            annotations={annotations}
                            annotationDispatch={annotationDispatch}
                            pauseVideo={() => { videoRef.current.pause() }} />
                    </div>
                </div>
            </div>
            <ControlBar video={videoRef.current} playerState={playerState} />
            <Info videoState={playerState} />
        </div >
    );
}

export default Player;