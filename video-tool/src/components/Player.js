import React, { useEffect, useRef } from 'react';

import FrameNavigation from './controls/FrameNavigation';
import PlayPauseButton from './controls/PlayPauseButton';
import Video from './Video';
import Info from './Info';
import SourceSelector from './SourceSelector';
import PlaybackRate from './controls/PlaybackRate';

import { defaultPlayerState, playerReducer } from './state/player-context';


function Player() {
    const video = useRef();

    const [state, setState] = React.useState(defaultPlayerState);

    const updateState = () => setState(prevState => {
        return {
            ...prevState,
            currentTime: video.current.getCurrentTime(),
            currentFrame: video.current.getCurrentFrame()
        };
    });

    return (
        <div>
            <Video
                ref={video}
                setFrameCallbackState={updateState}
            >
            </Video>
            <PlayPauseButton video={video.current}></PlayPauseButton>
            <FrameNavigation video={video.current}></FrameNavigation>
            <PlaybackRate video={video.current}></PlaybackRate>
            <Info videoState={state}></Info>
            <SourceSelector></SourceSelector>
        </div>

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