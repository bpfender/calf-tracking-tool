import React, { useEffect, useRef, useState } from 'react';
import Video from './Video';
import ControlBar from '../controls/ControlBar';
import Info from '../Info';
import Annotation from './Annotation.js';
import "./Player.scss";
import { VideoBar } from './VideoBar';
import VideoSource from './VideoSource';
import { nextFrame } from './video-functions';
import { KeyFrames } from '../helpers/KeyFrames';
import { useDimensions } from './useDimensions';

//FIXME position of video isn't quite right yet. Not sure what's happen

function Player(props) {
    const {
        annotations, projectDispatch,
        playerState, playerDispatch } = props;

    const [hidden, setHidden] = useState(false);

    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const videoDimensions = useDimensions(videoRef);

    // Initialise component with video elements hidden
    useEffect(() => {
        videoContainerRef.current.hidden = true;
    }, [videoContainerRef]);

    useEffect(() => {
        if (playerState.framerate === 0) {
            videoContainerRef.current.hidden = true
            setHidden(false);
        } else {
            setTimeout(() => {
                videoContainerRef.current.hidden = false;
                setHidden(true);
            }, 500);
        }
    }, [playerState.framerate]);

    /*useEffect(() => {
        if (typeof (annotations.videoHandle) === 'string') {
            setHidden(false);
            videoContainerRef.current.hidden = true;
        }
    }, [annotations.videoHandle])*/

    useEffect(() => {
        console.log(playerState.currentFrame);
    }, [playerState.currentFrame])

    const isReviewed = () => {
        if (playerState.playing) {
            return false;
        }
        return annotations.isReviewed(playerState.currentFrame);
    };

    return (
        <div className={props.className}>
            <div className="video-content">
                <VideoBar
                    filename={playerState.filename}
                    src={playerState.src}
                    framerate={playerState.framerate}
                    videoWidth={playerState.videoWidth}
                    videoHeight={playerState.videoHeight}
                    projectDispatch={projectDispatch}
                    isReviewed={isReviewed()}
                    currentFrame={playerState.currentFrame}
                />
                <VideoSource
                    src={playerState.src}
                    hidden={hidden}
                    videoHandle={annotations.videoHandle}
                    projectDispatch={projectDispatch}
                    playerDispatch={playerDispatch} />
                <div
                    ref={videoContainerRef}
                    className="video-container">
                    <div className="video-window-container"
                    >
                        <Video
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
                            videoDimensions={videoDimensions}
                            currentFrame={playerState.currentFrame}
                            annotations={annotations}
                            projectDispatch={projectDispatch}
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

            <div className="player-helpers">

                <KeyFrames
                    framerate={playerState.framerate}
                    src={playerState.src}
                    duration={playerState.duration}
                    projectDispatch={projectDispatch}
                    keyframes={annotations.keyframes}
                    playerVidRef={videoRef}
                    currentFrame={playerState.currentFrame}
                />
            </div>
        </div >
    );
}

export default Player;


//<Info videoState={playerState} />

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
    projectDispatch={projectDispatch}
    pauseVideo={() => { videoRef.current.pause() }} />
</div>
</div>
*/