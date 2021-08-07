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

    //FIXME video? syntax is shite slider time not directly needed for slider
    return (
        <div className="control-bar">
            <ButtonGroup
                minimal={true}>
                <PlaybackSettings
                    disabled={playerState.src ? false : true}
                    video={video} />
                <Divider />
                <Rewind
                    disabled={playerState.src ? false : true}
                    video={video} />
                <PrevNFrames
                    disabled={playerState.src ? false : true}
                    video={video}
                    playerState={playerState} />
                <PrevFrame
                    disabled={playerState.src ? false : true}
                    video={video} />
                <PlayPause
                    disabled={playerState.src ? false : true}
                    video={video}
                    playerState={playerState} />
                <NextFrame
                    disabled={playerState.src ? false : true}
                    video={video} />
                <NextNFrames
                    disabled={playerState.src ? false : true}
                    video={video}
                    playerState={playerState} />
            </ButtonGroup>
            <VideoSlider
                disabled={playerState.src ? false : true}
                video={video}
                playerState={playerState}
                sliderTime={playerState.src ? video.getFramesAsTime(selectedFrame) : 0}
                setSelectedFrame={setSelectedFrame}
                selectedFrame={selectedFrame} />
            <FrameSelector
                disabled={playerState.src ? false : true}
                video={video}
                playerState={playerState}
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame} />
        </div >
    );

}