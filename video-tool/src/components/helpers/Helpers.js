import { Tab, Tabs } from '@blueprintjs/core';
import React from 'react';
import { Keyframes } from './Keyframes';
import './Helpers.scss';

export function Helpers(props) {
    const {
        framerate,
        src,
        duration,
        projectDispatch,
        keyframes,
        playerVidRef,
        currentFrame,
        paused } = props;

    return (
        <Tabs
            className={props.className}>
            <Tab
                id="keyframes"
                title="Keyframes"
                panelClassName="helper-tab"
                panel={<Keyframes
                    framerate={framerate}
                    src={src}
                    duration={duration}
                    projectDispatch={projectDispatch}
                    keyframes={keyframes}
                    playerVidRef={playerVidRef}
                    currentFrame={currentFrame}
                    paused={paused}
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