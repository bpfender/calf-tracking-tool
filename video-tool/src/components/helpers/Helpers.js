import { H4, Tab, Tabs } from '@blueprintjs/core';
import React from 'react';
import { Keyframes } from './Keyframes';
import './Helpers.scss';
import { Reviewed } from './Reviewed';
import { Anchors } from './Anchors';

export function Helpers(props) {
    const {
        framerate,
        src,
        duration,
        projectDispatch,
        keyframes,
        anchors,
        reviewed,
        playerVidRef,
        currentFrame,
        paused } = props;

    return (
        <Tabs
            className={props.className}>
            <Tab
                id="keyframes"
                title={<H4>Keyframes</H4>}
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
                id="reviewed"
                title={<H4>Reviewed</H4>}
                panelClassName="helper-tab"
                panel={<Reviewed
                    reviewed={reviewed}
                    currentFrame={currentFrame}
                    paused={paused}
                    videoRef={playerVidRef}
                    framerate={framerate} />} />
            <Tab
                id="anchors"
                title={<H4>Anchors</H4>}
                panelClassName="helper-tab"
                panel={
                    <Anchors
                        anchors={reviewed}
                        currentFrame={currentFrame}
                        paused={paused}
                        videoRef={playerVidRef}
                        framerate={framerate} />
                } />
        </Tabs>
    );
}