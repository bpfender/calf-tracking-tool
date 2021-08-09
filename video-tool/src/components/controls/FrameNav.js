import React from 'react';
import { Button } from '@blueprintjs/core';
import { nextFrame, prevFrame, rewind } from '../video/video-functions';

export function Rewind(props) {
    const { videoRef, disabled } = props;
    return (
        <Button
            disabled={disabled}
            icon="undo"
            onClick={() => {
                rewind(videoRef.current);
            }} />
    )
}

export function NextFrame(props) {
    const { videoRef, currentFrame, framerate, disabled } = props;
    return (
        <Button
            disabled={disabled}
            icon="arrow-right"
            onClick={() => {
                nextFrame(videoRef.current, currentFrame, framerate);
            }} />
    );
}

export function PrevFrame(props) {
    const { videoRef, currentFrame, framerate, disabled } = props;
    return (
        <Button
            disabled={disabled}
            icon="arrow-left"
            onClick={() => {
                prevFrame(videoRef.current, currentFrame, framerate);
            }} />
    );
}

export function NextNFrames(props) {
    const { videoRef, currentFrame, framerate, framesToSkip, disabled } = props;
    return (
        <Button
            disabled={disabled}
            icon="double-chevron-right"
            onClick={() => {
                nextFrame(videoRef.current, currentFrame, framerate, framesToSkip);
            }} />
    );
}

export function PrevNFrames(props) {
    const { videoRef, currentFrame, framerate, framesToSkip, disabled } = props;
    return (
        <Button
            disabled={disabled}
            icon="double-chevron-left"
            onClick={() => {
                prevFrame(videoRef.current, currentFrame, framerate, framesToSkip);
            }} />
    );
}

