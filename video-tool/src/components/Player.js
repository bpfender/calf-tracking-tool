import React from 'react';

import FrameNavigation from './FrameNavigation';
import PlayPauseButton from './PlayPauseButton';
import Video from './Video';
import Info from './Info';

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

        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
    }

    componentDidMount() {
        this.forceUpdate(); // Required to generate correct refs
    }

    setCurrentTime() {
        this.setState({ currentTime: this.video.getCurrentTime() });
    }

    setCurrentFrame() {
        this.setState({ currentFrame: this.video.getCurrentFrame() });
    }


    render() {
        return (
            <div>
                <Video
                    ref={element => {
                        this.video = element;
                    }}
                    setCurrentFrame={this.setCurrentFrame}
                    setCurrentTime={this.setCurrentTime}
                >
                </Video>
                <PlayPauseButton video={this.video}></PlayPauseButton>
                <FrameNavigation video={this.video}></FrameNavigation>
                <Info videoState={this.state}></Info>
            </div>
        )
    }
}

export default Player;