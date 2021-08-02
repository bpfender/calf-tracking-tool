import React, { useEffect, useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import "./FrameSelector.scss";

// FIXME useref() for timeout
export default function FrameSelector(props) {
    const { video, playerState } = props;
    const [inputFrame, setInputFrame] = useState(1);
    const [intent, setIntent] = useState("none");

    useEffect(() => {
        setInputFrame(playerState.currentFrame);
        setIntent("none");
    }, [playerState.currentFrame]);

    useEffect(() => {
        if (playerState.seeking) {
            setIntent("warning");
        } else {
            setIntent("none")
        }
    }, [playerState.seeking])

    useEffect(() => {
        video.setCurrentFrame(inputFrame);
    }, [inputFrame, video])

    // FIXME not sure this timeout is working properly

    // TODO needs to be updated based on slider value
    const handleChange = (event) => {
        if (event.target.value === "") {
            setInputFrame(1);
        } else {
            const value = parseInt(event.target.value);
            if (value > playerState.totalFrames) {
                setInputFrame(playerState.totalFrames);
            } else {
                setInputFrame(value);
            }
        }
    }

    // TODO possible to select all on click?
    // TODO wrap in label to extend clickable area?
    return (
        <div className="frame-selector">
            <InputGroup
                className="frame-input"
                onClick={event => { event.target.select() }}
                onChange={handleChange}
                type="number"
                leftIcon="duplicate"
                value={inputFrame}
                placeholder={playerState.totalFrames}
                min={1}
                max={playerState.totalFrames}
                step={1}
                intent={intent}
                small={true}
            ></InputGroup>
            <span className="frame-count">/ {playerState.totalFrames}</span>
        </div >
    );
}