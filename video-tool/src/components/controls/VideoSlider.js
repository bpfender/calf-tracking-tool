import React, { useEffect, useState } from 'react';
import { Tag, Slider } from '@blueprintjs/core';
import "./VideoSlider.scss";

export default function VideoSlider(props) {
    const { video, playerState } = props;
    const [sliderTime, setSliderTime] = useState();

    // Update slider time when playerState.mediaTime changes
    useEffect(() => {
        setSliderTime(playerState.mediaTime);
    }, [playerState.mediaTime])

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

    // TODO this needs to be driven by actual video length
    const totalTime = 3599;

    const handleChange = (time) => {
        setSliderTime(time);
    }

    const handleRelease = (time) => {
        video.setCurrentTime(time);
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
                stepSize={.01}
            ></Slider>
            <Tag
                className="time-display"
                icon="time"
                minimal={true}
            >
                {formatTime(sliderTime)} / {formatTime(playerState.duration)}
            </Tag>
        </div >
    )
}

