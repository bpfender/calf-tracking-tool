import React from 'react';

// TODO rewrite below to use generic button component
function FrameButton(props) {
    const { type, action } = props;
    const handleClick = () => { action() };

    return <button onClick={handleClick}>{type}</button>;
}


export function NextFrame(props) {
    const { video } = props;
    const handleClick = () => { video.nextFrame() };

    return <button onClick={handleClick}>NEXT FRAME</button>;

}

export function PrevFrame(props) {
    const { video } = props;
    const handleClick = () => { video.prevFrame() };

    return <button onClick={handleClick}>NEXT FRAME</button>;
}

export function NextNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.nextFrame(playerState.framesToSkip) };

    return <button onClick={handleClick}>NEXT N FRAMES</button>;
}

export function PrevNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.nextFrame(playerState.framesToSkip) };

    return <button onClick={handleClick}>PREV N FRAMES</button>;
}