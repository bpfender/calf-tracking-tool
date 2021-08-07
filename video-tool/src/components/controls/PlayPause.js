import React from 'react';
import { Button } from '@blueprintjs/core';

export default function PlayPause(props) {
    const { video, playerState, disabled } = props;
    const handlePlayClick = () => { video.play() };
    const handlePauseClick = () => { video.pause() };


    return (
        <Button
            disabled={disabled}
            icon={playerState.paused ? "play" : "pause"}
            onClick={playerState.paused ? handlePlayClick : handlePauseClick}
        ></Button>
    );
}