import React from 'react'

class FrameNavigation extends React.Component {
    constructor(props) {
        super(props)

        this.handleForwardClick = this.handleForwardClick.bind(this);
        this.handleBackwardClick = this.handleBackwardClick.bind(this);
    }

    handleForwardClick() {
        console.log("Frame forward click");
        this.props.video.nextFrame();
    }

    handleBackwardClick() {
        console.log("Frame backward click");
        this.props.video.prevFrame();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleForwardClick}>FRAME FORWARD</button>
                <button onClick={this.handleBackwardClick}>FRAME BACKWARD</button>
            </div>
        )
    }

}

export default FrameNavigation;