import React from "react";
import { HTMLSelect } from "@blueprintjs/core";

export default function FrameSkipSelect(props) {
    const { playerDispatch } = props;

    const handleChange = (event) => {
        const n = parseInt(event.currentTarget.value);
        playerDispatch({
            type: 'FRAMES_TO_SKIP',
            payload: { framesToSkip: n }
        });
    }

    return (
        <HTMLSelect
            onChange={handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
        </HTMLSelect >
    );
}