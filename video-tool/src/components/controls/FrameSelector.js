import React, { useEffect, useRef, useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import "./FrameSelector.scss";
import { seekFrame } from "../video/video-functions";

// FIXME useref() for timeout
export default function FrameSelector(props) {
    const { selectedFrame, setSelectedFrame } = props;

    const {
        videoRef,
        totalFrames,
        framerate,
        seeking,
        disabled } = props;

    const [intent, setIntent] = useState("none");
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (seeking) {
            setIntent("warning");
        } else {
            setIntent("none")
        }
    }, [seeking])

    const handleChange = (event) => {
        clearTimeout(timeoutRef.current);

        let frame = null;
        if (event.target.value === "") {
            setSelectedFrame(1);
            frame = 1;
        } else {
            const value = parseInt(event.target.value);
            if (value > totalFrames) {
                setSelectedFrame(totalFrames);
                frame = totalFrames;
            } else {
                setSelectedFrame(value);
                frame = value;
            }
        }

        const timeout = setTimeout(() => {
            seekFrame(videoRef.current, frame, framerate)
        }, 700);

        timeoutRef.current = timeout;
    }

    return (
        <div className="frame-selector">
            <InputGroup
                disabled={disabled}
                className="frame-input"
                onClick={event => { event.target.select() }}
                onChange={handleChange}
                type="number"
                leftIcon="duplicate"
                value={selectedFrame}
                min={1}
                max={totalFrames}
                step={1}
                intent={intent}
                async={true}
                small={true}
            ></InputGroup>
            <span className="frame-count">/ {totalFrames}</span>
        </div >
    );
}