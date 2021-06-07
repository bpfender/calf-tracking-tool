import React, { useState } from 'react';

// TODO rewrite below to use generic button component
/*function FrameButton(props) {
    const { type, action } = props;
    const handleClick = () => { action() };

    return <button onClick={handleClick}>{type}</button>;
}*/


export function NextFrame(props) {
    const { video } = props;
    const handleClick = () => { video.nextFrame() };

    return <button onClick={handleClick}>NEXT FRAME</button>;

}

export function PrevFrame(props) {
    const { video } = props;
    const handleClick = () => { video.prevFrame() };

    return <button onClick={handleClick}>PREV FRAME</button>;
}

export function NextNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.nextFrame(playerState.framesToSkip) };

    return <button onClick={handleClick}>NEXT N FRAMES</button>;
}

export function PrevNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.prevFrame(playerState.framesToSkip) };

    return <button onClick={handleClick}>PREV N FRAMES</button>;
}

export function FramesToSkip(props) {
    const { video } = props;

    const handleFramesClick = (n) => {
        video.changeFramesToSkip(n);
    }

    return (
        <div>
            <button onClick={() => handleFramesClick(5)}>5</button>
            <button onClick={() => handleFramesClick(10)}>10</button>
            <button onClick={() => handleFramesClick(20)}>20</button>
            <button onClick={() => handleFramesClick(50)}>50</button>
            <button onClick={() => handleFramesClick(100)}>100</button>
        </div>
    )
}

export function JumpToFrame(props) {
    const { video } = props;
    const [input, setInput] = useState();
    const handleChange = (event) => { setInput(event.target.value) };
    const handleSubmit = (event) => {
        event.preventDefault();
        video.setCurrentFrame(input);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Select Frame:
                <input type='number' onChange={handleChange}></input>
            </label>
            <input type='submit' value='Submit'></input>
        </form>
    );
}