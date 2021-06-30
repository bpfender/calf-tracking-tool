import React from "react";
import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

import FrameSkipSelect from "./FrameSkipSelect";
import PlaybackRateSelect from "./PlaybackRateSelect";


export default function PlaybackSettings(props) {
    const { video } = props;

    return (
        <Popover2
            className="playback-settings-button"
            content={<PlaybackSettingsMenu video={video} />}
        >
            <Button icon="cog"></Button>
        </Popover2>
    );
}

function PlaybackSettingsMenu(props) {
    const { video } = props;

    return (
        <div className="playback-settings-menu">
            <PlaybackRateSelect video={video}></PlaybackRateSelect>
            <FrameSkipSelect video={video}></FrameSkipSelect>
        </div>
    );
}