import React from 'react';

function PlayPauseButton(props) {

    const handlePlayClick = () => { props.video.play() };
    const handlePauseClick = () => { props.video.pause() };

    return (
        <div>
            <button onClick={handlePlayClick}>PLAY</button>
            <button onClick={handlePauseClick}>PAUSE</button>
        </div>)
}

export default PlayPauseButton;