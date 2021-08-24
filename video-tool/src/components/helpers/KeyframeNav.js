import { Button, ButtonGroup } from '@blueprintjs/core';
import React, { useState } from 'react';
import { seekFrame } from '../video/video-functions';

export function KeyframeNav(props) {
    const { disabled, keyframes, currentFrame, videoRef, framerate } = props;

    const [keyframeIndex, setKeyframeIndex] = useState(0);


    const handlePrevClick = () => {
        const prev = keyframes.findLastIndex(val => val < currentFrame);
        console.log(prev);
        if (prev > 0) {
            setKeyframeIndex(prev);
            seekFrame(videoRef.current, keyframes.get(prev), framerate);
        }
    };

    const handleNextClick = () => {
        const next = keyframes.findIndex(val => val > currentFrame);
        console.log(next);
        if (next > 0) {
            setKeyframeIndex(next);
            seekFrame(videoRef.current, keyframes.get(next), framerate);
        }
    };

    return (
        <div>
            <ButtonGroup
                disabled={disabled}>
                <Button
                    text="Prev"
                    onClick={handlePrevClick} />
                <Button
                    text="Next"
                    onClick={handleNextClick} />
            </ButtonGroup>
        </div>
    )
}