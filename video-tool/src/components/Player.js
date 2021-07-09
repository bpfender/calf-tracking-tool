import React, { useCallback, useState } from 'react';


import Video from './video/Video';
import ControlBar from './controls/ControlBar';
import Info from './Info';
import Annotation from './Annotation.js';
import "./Player.scss";

function Player(props) {
    const { annotations, annotationDispatch, playerState, playerDispatch } = props

    // TODO useeffect to mount video?
    // FIXME ref forwarding for video ref?
    // QUESTION not totally sure about my use of callback ref.should ref be done with imperativeHandle?
    const [video, setVideo] = useState();

    // TODO this needs to be set dynamically
    const style = {
        height: playerState.videoHeight + "px"
    };

    return (
        <div className={props.className}>
            <div className="video-window-container"
                style={style}>
                <Video
                    className="video-window"
                    ref={useCallback(node => { setVideo(node) }, [])}
                    playerDispatch={playerDispatch}>
                </Video>
                <Annotation
                    className="video-window annotation-overlay"
                    currentFrame={playerState.currentFrame}
                    annotations={annotations}
                    annotationDispatch={annotationDispatch}>
                </Annotation>
            </div>


            <ControlBar video={video} playerState={playerState}></ControlBar>
            <Info videoState={playerState}></Info>

        </div >
    )
}

export default Player;