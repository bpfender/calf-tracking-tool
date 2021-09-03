import React from 'react';
import { Tag, Slider } from '@blueprintjs/core';
import "./VideoSlider.scss";
import { getTimeAsFrames, seekTime } from '../video/video-functions';

export default function VideoSlider(props) {
    const { duration, framerate, disabled, videoRef, sliderTime, setSelectedFrame } = props;

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const h = date.getUTCHours();
        const m = date.getUTCMinutes();
        const s = date.getUTCSeconds();

        return [h, m, s]
            .map(e => e < 10 ? `0${e}` : `${e}`)
            .filter((e, i) => e !== '00' || i > 0)
            .join(':');
    }

    const handleChange = (time) => {
        // console.log(time);
        setSelectedFrame(getTimeAsFrames(time, framerate));
    }

    const handleRelease = (time) => {
        seekTime(videoRef.current, time);
    }

    return (
        <div className="video-slider">
            <Slider
                disabled={disabled}
                className="slider"
                onChange={handleChange}
                onRelease={handleRelease}
                labelRenderer={false}
                value={sliderTime}
                min={0}
                max={duration || 1}
                stepSize={.01} />
            <Tag
                className="time-display bp3-text-small"
                icon="time"
                minimal={true}>
                {formatTime(sliderTime)} / {formatTime(duration)}
            </Tag>
        </div >
    )
}

