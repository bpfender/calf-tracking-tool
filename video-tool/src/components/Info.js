import React from 'react';

class Info extends React.Component {
    render() {
        return (
            <div>
                <p>Media time: {this.props.videoState.currentTime}</p>
                <p>Current time: </p>
                <p>Frame: {this.props.videoState.currentFrame} </p>
            </div>
        )
    }
}

export default Info;