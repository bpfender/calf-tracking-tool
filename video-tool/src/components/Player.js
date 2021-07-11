import React, { useCallback, useRef, useState } from 'react';


import Video from './video/Video';
import ControlBar from './controls/ControlBar';
import Info from './Info';
import Annotation from './Annotation.js';
import "./Player.scss";

function Player(props) {
    const { annotations, annotationDispatch, playerState, playerDispatch } = props

    // TODO useeffect to mount video?
    const videoRef = useRef(null);

    // TODO this needs to be set dynamically
    const style = {
        height: playerState.videoHeight + "px"
    };

    //FIXME usecallback change to ref
    return (
        <div className={props.className}>
            <div className="video-window-container"
                style={style}>
                <Video
                    className="video-window"
                    ref={videoRef}
                    playerDispatch={playerDispatch}>
                </Video>
                <Annotation
                    className="video-window annotation-overlay"
                    currentFrame={playerState.currentFrame}
                    annotations={annotations}
                    annotationDispatch={annotationDispatch}
                    pauseVideo={() => { videoRef.current.pause() }}>

                </Annotation>
            </div>


            <ControlBar video={videoRef.current} playerState={playerState}></ControlBar>
            <Info videoState={playerState}></Info>

        </div >
    );
}

export default Player;