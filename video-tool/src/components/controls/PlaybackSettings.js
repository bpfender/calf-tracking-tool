import React from "react";
import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

import FrameSkipSelect from "./FrameSkipSelect";
import PlaybackRateSelect from "./PlaybackRateSelect";


export default function PlaybackSettings(props) {
    const { videoRef, playerDispatch, disabled } = props;

    return (
        <Popover2
            disabled={disabled}
            className="playback-settings-button"
            content={content(videoRef, playerDispatch)}>
            <Button
                disabled={disabled}
                icon="cog" />
        </ Popover2>
    );
}

const content = (videoRef, playerDispatch) => {
    return (
        <PlaybackSettingsMenu
            videoRef={videoRef}
            playerDispatch={playerDispatch} />
    );
}

function PlaybackSettingsMenu(props) {
    const { videoRef, playerDispatch } = props;

    return (
        <div className="playback-settings-menu">
            <PlaybackRateSelect
                videoRef={videoRef} />
            <FrameSkipSelect
                playerDispatch={playerDispatch} />
        </div>
    );
}