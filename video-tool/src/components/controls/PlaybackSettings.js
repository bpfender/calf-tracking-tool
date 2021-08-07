import React from "react";
import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

import FrameSkipSelect from "./FrameSkipSelect";
import PlaybackRateSelect from "./PlaybackRateSelect";


export default function PlaybackSettings(props) {
    const { video, disabled } = props;

    return (
        <Popover2
            disabled={disabled}
            className="playback-settings-button"
            content={<PlaybackSettingsMenu video={video} />}
        >
            <Button
                disabled={disabled}
                icon="cog" />
        </Popover2>
    );
}

function PlaybackSettingsMenu(props) {
    const { video } = props;

    return (
        <div className="playback-settings-menu">
            <PlaybackRateSelect
                video={video} />
            <FrameSkipSelect
                video={video} />
        </div>
    );
}