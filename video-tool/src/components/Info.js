import React from 'react';


function Info(props) {
    console.log(props.videoState);

    return (
        <div>
            <p>Media time: {props.videoState.mediaTime}</p>
            <p>Frame: {props.videoState.currentFrame} </p>
        </div>
    )
}

export default Info;