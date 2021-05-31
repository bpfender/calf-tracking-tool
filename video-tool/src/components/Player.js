import React from 'react';

import FrameNavigation from './FrameNavigation';
import PlayPauseButton from './PlayPauseButton';
import Video from './Video';
import Info from './Info';

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.video = null;
    }

    componentDidMount() {
        this.forceUpdate(); // Required to generate correct refs
    }

    render() {
        return (
            <div>
                <Video
                    ref={element => {
                        this.video = element;
                    }}
                >
                </Video>
                <PlayPauseButton video={this.video}></PlayPauseButton>
                <FrameNavigation video={this.video}></FrameNavigation>
                <Info></Info>
            </div>
        )
    }
}

export default Player;