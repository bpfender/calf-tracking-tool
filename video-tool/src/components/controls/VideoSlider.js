import React, { useEffect, useState } from 'react';
import { Tag, Slider } from '@blueprintjs/core';
import "./VideoSlider.scss";

export function VideoSlider(props) {
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

    const onChangeHandler = (time) => {
        setSliderTime(time);
    }

    const onReleaseHandler = (time) => {
        video.setCurrentTime(time);
    }

    return (
        <div className="video-slider">
            <Slider
                className="slider"
                onChange={onChangeHandler}
                onRelease={onReleaseHandler}
                labelRenderer={false}
                value={sliderTime}
                min={0}
                max={totalTime}
                stepSize={.01}
            ></Slider>
            <Tag
                className="time-display"
                icon="time"
                minimal={true}
            >{formatTime(sliderTime)} / {formatTime(totalTime)}</Tag>
        </div >
    )
}

