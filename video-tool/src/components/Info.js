import React from 'react';


function Info(props) {
    //console.log(props.videoState);
    const { videoState } = props;

    let seek = props.videoState.seeking === true ? <p>seeking</p> : <p> ready </p>;


    return (
        <div>
            {seek}
            <p>Frames to skip: {videoState.framesToSkip}  |  Rate: {videoState.playbackRate}x</p>
            <p>Media time: {videoState.mediaTime}  |  Frame: {videoState.currentFrame}</p>
        </div>
    )
}

export default Info;