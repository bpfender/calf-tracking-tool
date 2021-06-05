import React from 'react';


function Info(props) {
    //console.log(props.videoState);

    let seek = props.videoState.seeking === true ? <p>seeking</p> : <p> playing </p>;


    return (
        <div>
            {seek}
            <p>Rate: {props.videoState.playbackRate}</p>
            <p>Media time: {props.videoState.mediaTime}</p>
            <p>Frame: {props.videoState.currentFrame} </p>
        </div>
    )
}

export default Info;