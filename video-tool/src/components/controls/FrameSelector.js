import React, { useEffect, useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import "./FrameSelector.scss";


export default function FrameSelector(props) {
    const { video, playerState } = props;
    const [currentFrame, setCurrentFrame] = useState(1);
    const [intent, setIntent] = useState("none");

    useEffect(() => {
        setCurrentFrame(playerState.currentFrame);
        setIntent("none");
    }, [playerState.currentFrame]);

    useEffect(() => {
        if (playerState.seeking) {
            setIntent("warning");
        } else {
            setIntent("none")
        }
    }, [playerState.seeking])

    // FIXME not sure this timeout is working properly
    // FIXME limit numerical input and validate input
    // TODO needs to be updated based on slider value
    const handleChange = (event) => {
        setTimeout(video.setCurrentFrame, 1000, parseInt(event.target.value));
    }

    // TODO possible to select all on click?
    // TODO wrap in label to extend clickable area?
    return (
        <div className="frame-selector">
            <InputGroup
                className="frame-input"
                onChange={handleChange}
                type="number"
                leftIcon="duplicate"
                value={currentFrame}
                placeholder={playerState.totalFrames}
                min={1}
                max={playerState.totalFrames}
                step={1}
                asyncControl={true}
                intent={intent}
                small={true}
            ></InputGroup>
            <span className="frame-count">/ {playerState.totalFrames}</span>
        </div >
    );
}