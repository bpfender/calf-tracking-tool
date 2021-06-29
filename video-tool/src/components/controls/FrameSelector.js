import React, { useEffect, useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import "./FrameSelector.scss";


export default function FrameSelector(props) {
    const { video, playerState } = props;
    const [currentFrame, setCurrentFrame] = useState(1);
    const [intent, setIntent] = useState("none");

    // TODO update total frames based on player state
    const frameCount = 86302

    useEffect(() => {
        setCurrentFrame(playerState.currentFrame);
        setIntent("none");
    }, [playerState.currentFrame]);

    useEffect(() => {
        if (playerState.seeking) {
            setIntent("warning");
        } else {
            setIntent("success")
        }
    }, [playerState.seeking])

    // FIXME not sure this timeout is working properly
    // FIXME limit numerical input and validate input
    // TODO needs to be updated based on slider value
    const changeHandler = (event) => {
        setTimeout(video.setCurrentFrame, 1000, parseInt(event.target.value));
    }

    // TODO possible to select all on click?
    return (
        <div className="frame-selector">
            <InputGroup
                className="frame-input"
                onChange={changeHandler}
                type="number"
                leftIcon="duplicate"
                value={currentFrame}
                placeholder={frameCount}
                min={1}
                max={frameCount}
                step={1}
                asyncControl={true}
                intent={intent}
                small={true}
            ></InputGroup>
            <span className="frame-count">/ {frameCount}</span>
        </div >
    );
}