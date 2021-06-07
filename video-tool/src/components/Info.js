import React from 'react';


function Info(props) {
    //console.log(props.videoState);
    const { videoState } = props;

    let seek = props.videoState.seeking === true ? <p>seeking</p> : <p> playing </p>;


    return (
        <div>
            {seek}
            <p>Frames to skip: {videoState.framesToSkip}</p>
            <p>Rate: {videoState.playbackRate}</p>
            <p>Media time: {videoState.mediaTime}</p>
            <p>Frame: {videoState.currentFrame} </p>
        </div>
    )
}

export default Info;