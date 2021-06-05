import React from 'react';

import PlayPause from './PlayPause';
import { NextFrame, PrevFrame, NextNFrames, PrevNFrames, FramesToSkip, JumpToFrame } from './FrameNav';
import { PlaybackRate } from './PlaybackRate';

function ControlBar(props) {
    const { video, playerState } = props;

    return (
        <div>
            <PrevNFrames video={video} playerState={playerState}></PrevNFrames>
            <PrevFrame video={video}></PrevFrame>
            <PlayPause video={video} playerState={playerState}></PlayPause>
            <NextFrame video={video}></NextFrame>
            <NextNFrames video={video} playerState={playerState}></NextNFrames>
            <FramesToSkip video={video}></FramesToSkip>
            <PlaybackRate video={video}></PlaybackRate>
            <JumpToFrame video={video}></JumpToFrame>
        </div>
    );
}

export default ControlBar;