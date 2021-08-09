import React from 'react';
import { Button } from '@blueprintjs/core';
import { pause, play } from '../video/video-functions';

export default function PlayPause(props) {
    const { videoRef, mediaTime, vsync, paused, disabled } = props;

    const handlePlayClick = async () => {
        await play(videoRef.current);
    };

    const handlePauseClick = () => {
        pause(videoRef.current, mediaTime, vsync);
    };

    return (
        <Button
            disabled={disabled}
            icon={paused ? "play" : "pause"}
            onClick={paused ? handlePlayClick : handlePauseClick} />
    );
}