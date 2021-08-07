import React, { useEffect, useRef } from 'react';
import Video from './Video';
import ControlBar from '../controls/ControlBar';
import Info from '../Info';
import Annotation from './Annotation.js';
import "./Player.scss";
import { VideoBar } from './VideoBar';
import VideoSource from './VideoSource';

//FIXME position of video isn't quite right yet. Not sure what's happen

function Player(props) {
    const {
        annotations, annotationDispatch,
        playerState, playerDispatch } = props;

    // TODO useeffect to mount video?
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);

    // TODO this needs to be set dynamically
    const style = {
        height: playerState.videoHeight + "px"
    };

    // Initialise component with video elements hidden
    useEffect(() => {
        videoContainerRef.current.hidden = true;
    }, [videoContainerRef])


    return (
        <div className={props.className}>
            <div className="video-content">
                <VideoBar
                    framerate={playerState.framerate}
                    videoWidth={playerState.videoWidth}
                    videoHeight={playerState.videoHeight}
                />
                <VideoSource
                    annotationDispatch={annotationDispatch} />
                <div
                    ref={videoContainerRef}
                    className="video-container">
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
            </div>
            <ControlBar video={videoRef.current} playerState={playerState} />
            <Info videoState={playerState} />
        </div >
    );
}

export default Player;




/*
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
*/