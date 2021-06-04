import React from 'react';


function Info(props) {
    return (
        <div>
            <p>Media time: {props.videoState.currentTime}</p>
            <p>Frame: {props.videoState.currentFrame} </p>
        </div>
    )
}

export default Info;