import React from 'react';

class PlaybackRate extends React.Component {
    constructor(props) {
        super(props);

        this.handlePlaybackRateClick = this.handlePlaybackRateClick.bind(this);
    }

    handlePlaybackRateClick(rate) {
        this.props.video.changePlaybackRate(rate);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handlePlaybackRateClick(1.0)}>1x</button>
                <button onClick={() => this.handlePlaybackRateClick(2.0)}>2x</button>
                <button onClick={() => this.handlePlaybackRateClick(4.0)}>4x</button>
            </div>
        )
    }
}

export default PlaybackRate;