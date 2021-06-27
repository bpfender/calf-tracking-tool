import React from 'react';
import { Button } from '@blueprintjs/core';

function PlayPause(props) {
    const { video, playerState } = props;
    const handlePlayClick = () => { video.play() };
    const handlePauseClick = () => { video.pause() };

    if (playerState.paused === true) {
        return <Button icon="play" onClick={handlePlayClick}></Button>;
    } else {
        return <Button icon="pause" onClick={handlePauseClick}></Button>;
    }
}

export default PlayPause;