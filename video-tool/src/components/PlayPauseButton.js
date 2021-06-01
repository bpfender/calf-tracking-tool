import React from 'react';

class PlayPauseButton extends React.Component {
    constructor(props) {
        super(props);

        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
    }

    handlePlayClick() {
        console.log("Play click");
        this.props.video.play();
    }

    handlePauseClick() {
        console.log("Pause click");
        this.props.video.pause();
    }

    render() {
        return (
            <div>
                <button onClick={this.handlePlayClick}>PLAY</button>
                <button onClick={this.handlePauseClick}>PAUSE</button>
            </div>
        )
    }

}

export default PlayPauseButton;