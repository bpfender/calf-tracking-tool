import React, { useEffect, useState } from 'react';
import { Slider } from '@blueprintjs/core';

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

    const onChangeHandler = (time) => {
        setSliderTime(time);
    }

    const onReleaseHandler = (time) => {
        video.setCurrentTime(time);
    }

    return (
        <Slider
            onChange={onChangeHandler}
            onRelease={onReleaseHandler}
            labelRenderer={formatTime}
            value={sliderTime}
            min={0}
            max={3599}
            stepSize={.01}
            labelStepSize={3599}>
        </Slider>
    )
}

