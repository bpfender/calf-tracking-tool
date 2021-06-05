import React from 'react';

function FrameNavigation(props) {
    const { video } = props;
    const handleRewindClick = () => { video.setCurrentTime(0) };
    const handleForwardClick = () => { video.nextFrame() };
    const handleBackwardClick = () => { video.prevFrame() };
    const handleFrameInput = (event) => {video.setCurrentFrame(event.target.value)};


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