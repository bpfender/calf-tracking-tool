import React from 'react';
import { ButtonGroup, ControlGroup } from '@blueprintjs/core';

import PlayPause from './PlayPause';
import { NextFrame, PrevFrame, NextNFrames, PrevNFrames, FramesToSkip } from './FrameNav';
import { PlaybackRate } from './PlaybackRate';
import { VideoSlider } from './VideoSlider';
import FrameSelector from './FrameSelector';

function ControlBar(props) {
    const { video, playerState } = props;

    return (
        <div>
            <VideoSlider video={video} playerState={playerState}></VideoSlider>


            <ButtonGroup>
                <PrevNFrames video={video} playerState={playerState}></PrevNFrames>
                <PrevFrame video={video}></PrevFrame>
                <PlayPause video={video} playerState={playerState}></PlayPause>
                <NextFrame video={video}></NextFrame>
                <NextNFrames video={video} playerState={playerState}></NextNFrames>
            </ButtonGroup>


            <FramesToSkip video={video}></FramesToSkip>
            <PlaybackRate video={video}></PlaybackRate>
            <FrameSelector video={video} playerState={playerState}></FrameSelector>

        </div >

    );

}

export default ControlBar;