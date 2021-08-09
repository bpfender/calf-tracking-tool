import React from 'react';
import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import { setPlaybackRate } from '../video/video-functions';

export default function PlaybackRateSelect(props) {
    const { videoRef } = props;

    const handleChange = (event) => {
        const rate = parseFloat(event.currentTarget.value);
        setPlaybackRate(videoRef.current, rate);
    };

    return (
        <FormGroup
            label="Playback rate"
            helperText="Playback rate"
            inline={true}>
            <HTMLSelect
                onChange={handleChange}>
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="4">4x</option>
                <option value="8">8x</option>
                <option value="16">16x</option>
            </HTMLSelect>
        </FormGroup>
    )
}