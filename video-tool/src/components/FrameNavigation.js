import React from 'react'

class FrameNavigation extends React.Component {
    constructor(props) {
        super(props)

        this.handleRewindClick = this.handleRewindClick.bind(this);
        this.handleForwardClick = this.handleForwardClick.bind(this);
        this.handleBackwardClick = this.handleBackwardClick.bind(this);
        this.handleFrameInput = this.handleFrameInput.bind(this);
    }

    handleRewindClick() {
        this.props.video.setCurrentTime(0.0);
    }

    handleForwardClick() {
        console.log("Frame forward click");
        this.props.video.nextFrame();
    }

    handleBackwardClick() {
        console.log("Frame backward click");
        this.props.video.prevFrame();
    }

    handleFrameInput(event) {
        this.props.video.setCurrentFrame(event.target.value);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleRewindClick}> REWIND</button>
                <button onClick={this.handleForwardClick}>FRAME FORWARD</button>
                <button onClick={this.handleBackwardClick}>FRAME BACKWARD</button>
                <input onChange={this.handleFrameInput}></input>
            </div>
        )
    }

}

export default FrameNavigation;