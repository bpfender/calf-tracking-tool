import React from 'react';

function PlaybackRate(props) {

    const handlePlaybackRateClick = (rate) => {
        props.video.changePlaybackRate(rate);
    };

    return (
        <div>
            <button onClick={() => handlePlaybackRateClick(1.0)}>1x</button>
            <button onClick={() => handlePlaybackRateClick(2.0)}>2x</button>
            <button onClick={() => handlePlaybackRateClick(4.0)}>4x</button>
            <button onClick={() => handlePlaybackRateClick(8.0)}>8x</button>
            <button onClick={() => handlePlaybackRateClick(16.0)}>16x</button>
        </div>
    )
}

export default PlaybackRate;