import React, { useState } from 'react';
import { Button, HTMLSelect, NumericInput } from '@blueprintjs/core';

// TODO rewrite below to use generic button component
/*function FrameButton(props) {
    const { type, action } = props;
    const handleClick = () => { action() };

    return <button onClick={handleClick}>{type}</button>;
}*/


export function NextFrame(props) {
    const { video } = props;
    const handleClick = () => { video.nextFrame() };

    return <Button icon="arrow-right" onClick={handleClick}></Button>;

}

export function PrevFrame(props) {
    const { video } = props;
    const handleClick = () => { video.prevFrame() };

    return (
        <Button
            icon="arrow-left"
            onClick={handleClick}>
        </Button>
    );
}

export function NextNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.nextFrame(playerState.framesToSkip) };

    return (
        <Button
            icon="double-chevron-right"
            onClick={handleClick}>
        </Button>
    );
}

export function PrevNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.prevFrame(playerState.framesToSkip) };

    return <Button icon="double-chevron-left" onClick={handleClick}></Button>;
}

export function FramesToSkip(props) {
    const { video } = props;

    const handleFramesClick = (n) => {
        video.changeFramesToSkip(n);
    }

    return (
        <HTMLSelect
            onChange={(event) => {
                handleFramesClick(parseInt(event.currentTarget.value))
            }}>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </HTMLSelect>
    )
}

