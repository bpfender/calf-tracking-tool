import React, { useEffect, useRef, useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import "./FrameSelector.scss";

// FIXME useref() for timeout
export default function FrameSelector(props) {
    const { video, playerState } = props;

    const [inputFrame, setInputFrame] = useState(1);
    const [intent, setIntent] = useState("none");
    const timeoutRef = useRef(null);

    useEffect(() => {
        setInputFrame(playerState.currentFrame);
    }, [playerState.currentFrame]);

    useEffect(() => {
        if (playerState.seeking) {
            setIntent("warning");
        } else {
            setIntent("none")
        }
    }, [playerState.seeking])

    // FIXME not sure this timeout is working properly

    // TODO needs to be updated based on slider value
    const handleChange = (event) => {
        clearTimeout(timeoutRef.current);

        let frame = null;
        if (event.target.value === "") {
            setInputFrame(1);
            frame = 1;
        } else {
            const value = parseInt(event.target.value);
            if (value > playerState.totalFrames) {
                setInputFrame(playerState.totalFrames);
                frame = playerState.totalFrames;
            } else {
                setInputFrame(value);
                frame = value;
            }
        }
        const timeout = setTimeout(video.setCurrentFrame, 700, frame);
        timeoutRef.current = timeout;

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
                min={1}
                max={playerState.totalFrames}
                step={1}
                intent={intent}
                async={true}
                small={true}
            ></InputGroup>
            <span className="frame-count">/ {playerState.totalFrames}</span>
        </div >
    );
}