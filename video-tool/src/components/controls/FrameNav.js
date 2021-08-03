import React from 'react';
import { Button } from '@blueprintjs/core';

export function Rewind(props) {
    const { video } = props;
    const handleClick = () => { video.rewind() }

    return (
        <Button
            icon="undo"
            onClick={handleClick}
        />
    )
}


export function NextFrame(props) {
    const { video } = props;
    const handleClick = () => { video.nextFrame() };

    return (
        <Button
            icon="arrow-right"
            onClick={handleClick}
        />
    );
}

export function PrevFrame(props) {
    const { video } = props;
    const handleClick = () => { video.prevFrame() };

    return (
        <Button
            icon="arrow-left"
            onClick={handleClick}
        />
    );
}

export function NextNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.nextFrame(playerState.framesToSkip) };

    return (
        <Button
            icon="double-chevron-right"
            onClick={handleClick}
        />
    );
}

export function PrevNFrames(props) {
    const { video, playerState } = props;
    const handleClick = () => { video.prevFrame(playerState.framesToSkip) };

    return (
        <Button
            icon="double-chevron-left"
            onClick={handleClick}
        />
    );
}

