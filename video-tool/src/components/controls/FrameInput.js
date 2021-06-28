import React, { useEffect, useState } from "react";
import { NumericInput } from "@blueprintjs/core";

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

    const handleValueChange = (frame) => {
        video.setCurrentFrame(frame);
    }


    return (
        <NumericInput
            onValueChange={handleValueChange}
            intent={intent}
            value={frame}
            leftIcon="duplicate"
            buttonPosition="none"
            minorStepSize={1}
            min={0}

        >

        </NumericInput>
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