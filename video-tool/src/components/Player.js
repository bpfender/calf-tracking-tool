import React, { useCallback, useReducer, useState } from 'react';
import { defaultPlayerState, playerReducer } from './state/player-state.js';

import Video from './video/Video';
import ControlBar from './controls/ControlBar';
import Info from './Info';
import Annotation from './Annotation.js';

function Player() {
    // QUESTION not totally sure about my use of callback ref
    const [video, setVideo] = useState();
    const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);

    /* 
    const [state, setState] = useState(defaultPlayerState);
    const updateState = () => setState(prevState => {
         return {
             ...prevState,
             currentTime: video.getCurrentTime(),
             currentFrame: video.getCurrentFrame()
         };
     });*/

    return (
        <div>
            <Video
                ref={useCallback(node => { setVideo(node) }, [])}
                playerDispatch={playerDispatch}
            >
            </Video>

            <ControlBar video={video} playerState={playerState}></ControlBar>
            <Info videoState={playerState}></Info>
            <Annotation></Annotation>
        </div >
    )
}



/*
class Player extends React.Component {
    constructor(props) {
        super(props);

        this.video = null;
        this.state = defaultPlayerState;

        this.setFrameCallbackState = this.setFrameCallbackState.bind(this)
    }

    componentDidMount() {
        this.forceUpdate(); // Required to generate correct refs
    }

    setFrameCallbackState() {
        this.setState({ currentTime: this.video.getMediaTime() });
        this.setState({ currentFrame: this.video.getCurrentFrame() });
    }

    render() {
        return (
            <div>
                <Video
                    ref={element => {
                        this.video = element;
                    }}
                    setFrameCallbackState={this.setFrameCallbackState}
                >
                </Video>
                <PlayPauseButton video={this.video}></PlayPauseButton>
                <FrameNavigation video={this.video}></FrameNavigation>
                <PlaybackRate video={this.video}></PlaybackRate>
                <Info videoState={this.state}></Info>
                <SourceSelector></SourceSelector>
            </div>
        )
    }
}*/

export default Player;