// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop
// https://stackoverflow.com/questions/33420306/drag-drop-datatransfer-object
//https://web.dev/datatransfer/

import { Colors, Icon } from '@blueprintjs/core';
import { get } from 'idb-keyval';
import React, { useEffect, useState } from 'react';
import { getVideoHandle } from '../storage/file-access';

export default function VideoSource() {
    const [dragState, setDragState] = useState("");
    const [message, setMessage] = useState("Add a video file to get started...");

    // Removing default effects
    useEffect(() => {
        window.addEventListener("dragover", event => { event.preventDefault() });
        window.addEventListener("drop", event => { event.preventDefault() });

        return (() => {
            window.removeEventListener("dragover");
            window.removeEventListener("drop");
        })
    }, [])


    const handleClick = async () => {
        setDragState("primary");
        const parentDir = await get('parentDir');
        const videoHandle = await getVideoHandle(parentDir);
    }

    const handleDrop = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.types[0]);
        if (event.dataTransfer.items.length > 1) {
            setDragState("warning");
            setMessage("Please add just one video file.");
        } else {
            setDragState("primary")
        }
    }

    const handleDragEnter = (event) => {
        event.preventDefault();
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragState("");
        setMessage("Add a video file to get started...");
    }

    return (
        <div
            className={"video-container player-video-source-content " + dragState}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}>
            <Icon
                className={"player-video-source-icon"}
                icon="add"
                iconSize={160}
                color={Colors.DARK_GRAY1}
            />

            <p>{message}</p>

        </ div >
    );
}