import React, { useEffect, useState } from "react";
import { NumericInput, Tag } from "@blueprintjs/core";

export default function FrameInput(props) {
    const { video, playerState } = props;
    const [frame, setFrame] = useState(1);
    const [intent, setIntent] = useState("none");


    useEffect(() => {
        setFrame(playerState.currentFrame);
        setIntent("none");
    }, [playerState.currentFrame]);

    useEffect(() => {
        if (playerState.seeking) {
            setIntent("warning");
        } else {
            setIntent("success")
        }
    }, [playerState.seeking])

    let timeout = null;
    const handleValueChange = (number) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        setFrame(number);
        timeout = setTimeout(video.setCurrentFrame, 2000, number);
    }

    return (
        <div className="frame-selector">
            <NumericInput
                className="frame-input"
                onValueChange={handleValueChange}
                intent={intent}
                value={frame}
                leftIcon="duplicate"
                buttonPosition="none"
                selectAllOnFocus={true}
                selectAllOnIncrement={true}
                minorStepSize={1}
                min={1}
            ></NumericInput>
            <Tag>XX</Tag>
        </div>
    );

    /*return (


        <form onSubmit={handleSubmit}>
            <label>Select Frame:
                <input type='number' onChange={handleChange}></input>
            </label>
            <input type='submit' value='Submit'></input>
        </form>
    );*/
}