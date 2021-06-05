import React from 'react';

function PlayPause(props) {
    const { video, videoState } = props;
    const handlePlayClick = () => { video.play() };
    const handlePauseClick = () => { video.pause() };

    if (videoState.paused === true) {
        return <button onClick={handlePlayClick}>PLAY</button>;
    } else {
        return <button onClick={handlePauseClick}>PAUSE</button>
    }
}

export default PlayPause;