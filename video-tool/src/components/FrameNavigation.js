import React from 'react';

function FrameNavigation(props) {

    const handleRewindClick = () => { props.video.setCurrentTime(0) };
    const handleForwardClick = () => { props.video.nextFrame() };
    const handleBackwardClick = () => { props.video.prevFrame() };
    const handleFrameInput = (event) => props.video.setCurrentFrame(event.target.value);


    return (
        <div>
            <button onClick={handleRewindClick}> REWIND</button>
            <button onClick={handleForwardClick}>FRAME FORWARD</button>
            <button onClick={handleBackwardClick}>FRAME BACKWARD</button>
            <input onChange={handleFrameInput}></input>
        </div>
    )
}

export default FrameNavigation;