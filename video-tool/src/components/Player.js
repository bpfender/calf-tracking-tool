import React, { useCallback, useReducer, useState } from 'react';

import FrameNavigation from './controls/FrameNavigation';
import PlayPause from './controls/PlayPause';
import Video from './Video';
import Info from './Info';
import SourceSelector from './SourceSelector';
import PlaybackRate from './controls/PlaybackRate';

import { defaultPlayerState, playerReducer } from './state/player-context';


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
            <PlayPause video={video} videoState={playerState}></PlayPause>
            <FrameNavigation video={video}></FrameNavigation>
            <PlaybackRate video={video}></PlaybackRate>
            <Info videoState={playerState}></Info>
            <SourceSelector></SourceSelector>
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