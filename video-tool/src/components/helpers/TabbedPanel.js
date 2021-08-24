import { Tab, Tabs } from '@blueprintjs/core';
import React from 'react';
import { KeyFrames } from './KeyFrames';

export function TabbedPanel(props) {
    const {
        framerate,
        src,
        duration,
        projectDispatch,
        keyframes,
        playerVidRef,
        currentFrame } = props;

    return (
        <Tabs>
            <Tab
                id="keyframes"
                title="Keyframes"
                panel={<KeyFrames
                    framerate={framerate}
                    src={src}
                    duration={duration}
                    projectDispatch={projectDispatch}
                    keyframes={keyframes}
                    playerVidRef={playerVidRef}
                    currentFrame={currentFrame}
                />} />
            <Tab
                id="anchors"
                title="Anchors" />
            <Tab
                id="reviewed"
                title="Reviewed" />
        </Tabs>
    );
}