import React from 'react';

import FrameNavigation from './FrameNavigation';
import PlayPauseButton from './PlayPauseButton';
import Video from './Video';
import Info from './Info';
import SourceSelector from './SourceSelector';
import PlaybackRate from './PlaybackRate';

const defaultVideoState = {
    currentSrc: null,
    duration: 0,
    totalFrames: 0,
    fps: undefined,
    playbackRate: 1,

    ready: null,
    loading: null,
    playing: null,
    seeking: null,
    ended: null,

    currentTime: 0,
    currentFrame: 0,
};

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.video = null;
        this.state = defaultVideoState;

        this.setFrameCallbackState = this.setFrameCallbackState.bind(this)
    }

    componentDidMount() {
        this.forceUpdate(); // Required to generate correct refs
    }

    setFrameCallbackState() {
        this.setState({ currentTime: this.video.getCurrentTime() });
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
}

export default Player;