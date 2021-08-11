// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop
// https://stackoverflow.com/questions/33420306/drag-drop-datatransfer-object
//https://web.dev/datatransfer/


//FIXME this needs some cleaning!
import { Colors, Icon } from '@blueprintjs/core';
import { get } from 'idb-keyval';
import React, { useEffect, useState } from 'react';
import { getVideoHandle } from '../storage/file-access';


// FIXME pull validation out into separate function
export default function VideoSource(props) {
    const { src, annotationDispatch, playerDispatch, hidden, projectDispatch } = props;

    const [dragState, setDragState] = useState("none");
    const [message, setMessage] = useState("Add a video file to get started...");

    // Removing default effects on mount
    useEffect(() => {
        const prevent = (event) => { event.preventDefault() };
        window.addEventListener("dragover", prevent);
        window.addEventListener("drop", prevent);

        return (() => {
            window.removeEventListener("dragover", prevent);
            window.removeEventListener("drop", prevent);
        })
    }, [])

    useEffect(() => {
        if (src) {
            setDragState("success");
            setMessage("Loading...");
        }
    }, [src]);

    const setVideoDispatch = async (handle) => {
        projectDispatch({
            type: 'ADD_TASK',
            payload: {
                videoHandle: handle,
            }
        });

        annotationDispatch({
            type: 'SET_VIDEO',
            payload: { handle: handle }
        });
        //FIXME move this into effect in player?
        playerDispatch({
            type: 'SRC_CHANGE',
            payload: { src: URL.createObjectURL(await handle.getFile()) }
        });
    }

    const handleClick = async () => {
        try {
            setDragState("primary");
            const parentDir = await get('parentDir');
            const handle = await getVideoHandle(parentDir);
            const file = await handle.getFile();

            if (!file.type.includes("video")) {
                throw new Error("This is not a valid video file");
            }

            setVideoDispatch(handle);
        } catch (error) {
            if (error.message.includes("valid")) {
                setDragState("warning");
                setMessage(error.message);
            } else {
                setDragState("none");
                setMessage("Plase add a video file");
            }
        }
    }

    const handleDrop = async (event) => {
        event.preventDefault();
        const item = event.dataTransfer.items[0];
        console.log(item);
        try {
            if (!item.type.includes("video")) {
                throw new Error("This is not a valid video file");
            }

            const handle = await item.getAsFileSystemHandle();
            setVideoDispatch(handle);
        } catch (error) {
            setDragState("warning");
            setMessage(error.message);
        }
    };

    // Validate input for number of files
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

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragState("");
        setMessage("Add a video file to get started...");
    }

    const setHiddenClass = () => {
        return hidden ? " hidden" : "";
    }

    // FIZME Hidden class is a bit messy
    return (
        <div
            className={["video-container player-video-source-content", dragState, setHiddenClass()].join(" ")}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}>
            <Icon
                className={"player-video-source-icon"}
                icon="add"
                iconSize={160}
                color={Colors.DARK_GRAY1} />
            <p>{message}</p>
        </ div >
    );
}