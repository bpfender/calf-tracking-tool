import React from 'react';
import { Button } from '@blueprintjs/core';

export function Rewind(props) {
    const { video, disabled } = props;
    const handleClick = () => { video.rewind() }

    return (
        <Button
            disabled={disabled}
            icon="undo"
            onClick={handleClick}
        />
    )
}


export function NextFrame(props) {
    const { video, disabled } = props;
    const handleClick = () => { video.nextFrame() };

    return (
        <Button
            disabled={disabled}
            icon="arrow-right"
            onClick={handleClick}
        />
    );
}

export function PrevFrame(props) {
    const { video, disabled } = props;
    const handleClick = () => { video.prevFrame() };

    return (
        <Button
            disabled={disabled}
            icon="arrow-left"
            onClick={handleClick}
        />
    );
}

export function NextNFrames(props) {
    const { video, playerState, disabled } = props;
    const handleClick = () => { video.nextFrame(playerState.framesToSkip) };

    return (
        <Button
            disabled={disabled}
            icon="double-chevron-right"
            onClick={handleClick}
        />
    );
}

export function PrevNFrames(props) {
    const { video, playerState, disabled } = props;
    const handleClick = () => { video.prevFrame(playerState.framesToSkip) };

    return (
        <Button
            disabled={disabled}
            icon="double-chevron-left"
            onClick={handleClick}
        />
    );
}

