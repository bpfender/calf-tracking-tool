import React, { useEffect, useState } from 'react';
import { ButtonGroup, Divider } from '@blueprintjs/core';
import "./ControlBar.scss";

import PlayPause from './PlayPause';
import { NextFrame, PrevFrame, NextNFrames, PrevNFrames, Rewind } from './FrameNav';
import VideoSlider from './VideoSlider';
import FrameSelector from './FrameSelector';
import PlaybackSettings from './PlaybackSettings';
import { getFramesAsTime } from '../video/video-functions';

export default function ControlBar(props) {
    const {
        videoRef, playerDispatch, totalFrames, duration,
        src, mediaTime, paused, seeking,
        currentFrame, framerate,
        framesToSkip, vsync } = props;

    const [selectedFrame, setSelectedFrame] = useState(1);
    console.log(selectedFrame);
    console.log(currentFrame);

    useEffect(() => {
        setSelectedFrame(currentFrame);
    }, [currentFrame]);

    //FIXME video? syntax is shite slider time not directly needed for slider
    return (
        <div className="control-bar">
            <ButtonGroup
                minimal={true}>
                <PlaybackSettings
                    videoRef={videoRef}
                    playerDispatch={playerDispatch}
                    disabled={src ? false : true} />
                <Divider />
                <Rewind
                    videoRef={videoRef}
                    disabled={src ? false : true} />
                <PrevNFrames
                    videoRef={videoRef}
                    currentFrame={currentFrame}
                    framerate={framerate}
                    framesToSkip={framesToSkip}
                    disabled={src ? false : true} />
                <PrevFrame
                    videoRef={videoRef}
                    currentFrame={currentFrame}
                    framerate={framerate}
                    disabled={src ? false : true} />
                <PlayPause
                    videoRef={videoRef}
                    mediaTime={mediaTime}
                    vsync={vsync}
                    paused={paused}
                    disabled={src ? false : true} />
                <NextFrame
                    videoRef={videoRef}
                    currentFrame={currentFrame}
                    framerate={framerate}
                    disabled={src ? false : true} />
                <NextNFrames
                    videoRef={videoRef}
                    currentFrame={currentFrame}
                    framerate={framerate}
                    framesToSkip={framesToSkip}
                    disabled={src ? false : true} />
            </ButtonGroup>
            <VideoSlider
                videoRef={videoRef}
                duration={duration}
                framerate={framerate}
                disabled={src ? false : true}
                sliderTime={src ? getFramesAsTime(selectedFrame, framerate) : 0}
                setSelectedFrame={setSelectedFrame} />
            <FrameSelector
                videoRef={videoRef}
                totalFrames={totalFrames}
                framerate={framerate}
                seeking={seeking}
                disabled={src ? false : true}
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame} />
        </div >
    );

}