import React from 'react';
import { ButtonGroup } from '@blueprintjs/core';
import "./ControlBar.scss";

import PlayPause from './PlayPause';
import { NextFrame, PrevFrame, NextNFrames, PrevNFrames } from './FrameNav';
import VideoSlider from './VideoSlider';
import FrameSelector from './FrameSelector';
import PlaybackSettings from './PlaybackSettings';

function ControlBar(props) {
    const { video, playerState } = props;

    // FIXME worth rewriting so playerState doesn't have to be passed at all?
    return (
        <div>
            <div className="slider-bar">
                <VideoSlider video={video} playerState={playerState}></VideoSlider>
                <FrameSelector video={video} playerState={playerState}></FrameSelector>
            </div >

            <ButtonGroup className="button-bar">
                <PrevNFrames video={video} playerState={playerState}></PrevNFrames>
                <PrevFrame video={video}></PrevFrame>
                <PlayPause video={video} playerState={playerState}></PlayPause>
                <NextFrame video={video}></NextFrame>
                <NextNFrames video={video} playerState={playerState}></NextNFrames>
            </ButtonGroup>

            <PlaybackSettings video={video}></PlaybackSettings>
        </div >

    );

}

export default ControlBar;