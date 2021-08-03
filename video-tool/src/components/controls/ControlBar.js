import React, { useEffect, useState } from 'react';
import { ButtonGroup, Divider } from '@blueprintjs/core';
import "./ControlBar.scss";

import PlayPause from './PlayPause';
import { NextFrame, PrevFrame, NextNFrames, PrevNFrames, Rewind } from './FrameNav';
import VideoSlider from './VideoSlider';
import FrameSelector from './FrameSelector';
import PlaybackSettings from './PlaybackSettings';

export default function ControlBar(props) {
    const { video, playerState } = props;
    const [selectedFrame, setSelectedFrame] = useState(1);

    useEffect(() => {
        setSelectedFrame(playerState.currentFrame);
    }, [playerState.currentFrame]);

    //FIXME video? syntax is shite
    return (
        <div className="control-bar">
            <ButtonGroup minimal={true}>
                <PlaybackSettings video={video}></PlaybackSettings>
                <Divider />
                <Rewind video={video} />
                <PrevNFrames video={video} playerState={playerState} />
                <PrevFrame video={video} />
                <PlayPause video={video} playerState={playerState} />
                <NextFrame video={video} />
                <NextNFrames video={video} playerState={playerState} />
            </ButtonGroup>
            <VideoSlider
                video={video}
                playerState={playerState}
                sliderTime={video ? video.getFramesAsTime(selectedFrame) : 0}
                setSelectedFrame={setSelectedFrame} />
            <FrameSelector
                video={video}
                playerState={playerState}
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame} />
        </div >
    );

}