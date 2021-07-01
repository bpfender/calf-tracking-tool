import React, { useCallback, useReducer, useState } from 'react';
import { defaultPlayerState, playerReducer } from './state/player-state.js';

import Video from './video/Video';
import ControlBar from './controls/ControlBar';
import Info from './Info';
import Annotation from './Annotation.js';
import "./Player.scss";

function Player() {
    // QUESTION not totally sure about my use of callback ref
    const [video, setVideo] = useState();
    const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);

    // TODO this needs to be set dynamically
    const style = {
        height: playerState.videoHeight + "px"
    };

    // FIXME should ref be done with imperativeHandle?
    return (
        <div>
            <div className="video-window-container"
                style={style}>
                <Video
                    className="video-window"
                    ref={useCallback(node => { setVideo(node) }, [])}
                    playerDispatch={playerDispatch}>
                </Video>
                <Annotation
                    className="video-window annotation-overlay">
                </Annotation>
            </div>


            <ControlBar video={video} playerState={playerState}></ControlBar>
            <Info videoState={playerState}></Info>

        </div >
    )
}

export default Player;