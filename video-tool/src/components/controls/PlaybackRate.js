import React from 'react';
import { HTMLSelect } from '@blueprintjs/core';

export function PlaybackRate(props) {
    const { video } = props;
    const handlePlaybackRateClick = (rate) => {
        video.changePlaybackRate(rate);
    };

    return (
        <HTMLSelect onChange={(event) => {
            handlePlaybackRateClick(parseInt(event.currentTarget.value))
        }}>
            <option value="1" selected>1x</option>
            <option value="2">2x</option>
            <option value="4">4x</option>
            <option value="8">8x</option>
            <option value="16">16x</option>
        </HTMLSelect>
    )
}