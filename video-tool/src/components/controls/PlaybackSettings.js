import React from "react";
import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import "./PlaybackSetting.scss"
import FrameSkipSelect from "./FrameSkipSelect";
import PlaybackRateSelect from "./PlaybackRateSelect";


export default function PlaybackSettings(props) {
    const { videoRef, playerDispatch, disabled, playbackRate, framesToSkip } = props;

    return (
        <Popover2
            disabled={disabled}
            className="playback-settings-button"
            content={
                <PlaybackSettingsMenu
                    videoRef={videoRef}
                    playerDispatch={playerDispatch}
                    playbackRate={playbackRate}
                    framesToSkip={framesToSkip} />
            }>
            <Button
                disabled={disabled}
                icon="cog" />
        </ Popover2>
    );
}



function PlaybackSettingsMenu(props) {
    const { videoRef, playerDispatch, framesToSkip, playbackRate } = props;

    return (
        <div className="playback-settings-menu">
            <PlaybackRateSelect
                videoRef={videoRef}
                playbackRate={playbackRate} />
            <FrameSkipSelect
                playerDispatch={playerDispatch}
                framesToSkip={framesToSkip} />
        </div>
    );
}