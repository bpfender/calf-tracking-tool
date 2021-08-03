import React from 'react';
import { Tag, Slider } from '@blueprintjs/core';
import "./VideoSlider.scss";

export default function VideoSlider(props) {
    const { video, playerState, sliderTime, setSelectedFrame, selectedFrame } = props;

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
        setSelectedFrame(video.getTimeAsFrames(time));
    }

    const handleRelease = (time) => {
        video.setCurrentFrame(selectedFrame);
    }

    return (
        <div className="video-slider">
            <Slider
                className="slider"
                onChange={handleChange}
                onRelease={handleRelease}
                labelRenderer={false}
                value={sliderTime}
                min={0}
                max={playerState.duration}
                stepSize={.01} />
            <Tag
                className="time-display bp3-text-small"
                icon="time"
                minimal={true}>
                {formatTime(sliderTime)} / {formatTime(playerState.duration)}
            </Tag>
        </div >
    )
}

