import React from "react";
import { HTMLSelect } from "@blueprintjs/core";

export default function FrameSkipSelect(props) {
    const { video } = props;

    const handleChange = (event) => {
        video.changeFramesToSkip(parseInt(event.currentTarget.value));
    }

    return (
        <HTMLSelect
            onChange={handleChange}
            defaultValue="5"
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </HTMLSelect >
    );
}
