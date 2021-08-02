import React, { useState } from 'react';
import { ButtonGroup, Divider } from '@blueprintjs/core';
import "./ControlBar.scss";

import PlayPause from './PlayPause';
import { NextFrame, PrevFrame, NextNFrames, PrevNFrames } from './FrameNav';
import VideoSlider from './VideoSlider';
import FrameSelector from './FrameSelector';
import PlaybackSettings from './PlaybackSettings';

function ControlBar(props) {
    const { video, playerState } = props;
    const [selectedFrame, setSelectedFrame] = useState();

    // FIXME worth rewriting so playerState doesn't have to be passed at all?
    return (
        <div className="control-bar">
            <ButtonGroup minimal={true}>
                <PlaybackSettings video={video}></PlaybackSettings>
                <Divider />
                <PrevNFrames video={video} playerState={playerState} />
                <PrevFrame video={video} />
                <PlayPause video={video} playerState={playerState} />
                <NextFrame video={video} />
                <NextNFrames video={video} playerState={playerState} />
            </ButtonGroup>
            <VideoSlider
                video={video}
                playerState={playerState} />
            <FrameSelector
                video={video}
                playerState={playerState} />
        </div >
    );

}

export default ControlBar;