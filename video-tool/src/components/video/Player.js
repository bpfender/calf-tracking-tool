import React, { useEffect, useRef, useState } from 'react';
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
        playerState, playerDispatch, projectDispatch } = props;

    const [hidden, setHidden] = useState(false);

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
    }, [videoContainerRef]);

    useEffect(() => {
        if (playerState.framerate !== 0) {
            videoContainerRef.current.hidden = false;
        } else {
            videoContainerRef.current.hidden = true;
        }

        setHidden(!videoContainerRef.current.hidden);
    }, [playerState.framerate]);

    useEffect(() => {
        console.log(hidden);
    }, [hidden]);


    return (
        <div className={props.className}>
            <div className="video-content">
                <VideoBar
                    src={playerState.src}
                    framerate={playerState.framerate}
                    videoWidth={playerState.videoWidth}
                    videoHeight={playerState.videoHeight}
                />
                <VideoSource
                    src={playerState.src}
                    hidden={hidden}
                    annotationDispatch={annotationDispatch}
                    playerDispatch={playerDispatch}
                    projectDispatch={projectDispatch} />
                <div
                    ref={videoContainerRef}
                    className="video-container">
                    <div className="video-window-container"
                        style={style}>
                        <Video
                            className="video-window"
                            videoRef={videoRef}
                            playerDispatch={playerDispatch}
                            src={playerState.src}
                            currentFrame={playerState.currentFrame}
                            mediaTime={playerState.mediaTime}
                            framerate={playerState.framerate}
                            readyState={playerState.readyState}
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
            <ControlBar
                videoRef={videoRef}
                playerDispatch={playerDispatch}
                totalFrames={playerState.totalFrames}
                duration={playerState.duration}
                src={playerState.src}
                mediaTime={playerState.mediaTime}
                paused={playerState.paused}
                seeking={playerState.seeking}
                currentFrame={playerState.currentFrame}
                framerate={playerState.framerate}
                framesToSkip={playerState.framesToSkip}
                vsync={playerState.vsync} />
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