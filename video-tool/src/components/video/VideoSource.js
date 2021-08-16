// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop
// https://stackoverflow.com/questions/33420306/drag-drop-datatransfer-object
//https://web.dev/datatransfer/

import { Colors, Icon } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { fileAlreadyInFolder, fileExists, getVideoHandle, moveFileIntoFolder } from '../storage/file-access';
import { retrieveAppDirHandle, retrieveVideoDirHandle } from '../storage/indexedDB';

const sourceStates = {
    start: { intent: "none", message: "Add a video file to get started..." },
    click: { intent: "primary", message: "Select file to be loaded." },
    dragged: { intent: "primary", message: "Drop file to load." },
    multiple: { intent: "warning", message: "Please add just one video file." },
    exists: { intent: "warning", message: "Video with this name already exists in VAT video folder." },
    error: { intent: "warning", message: "Could not load this file." },
    copying: { intent: "primary", message: "Copying video to VAT videos folder." },
    success: { intent: "success", message: "Loading video..." },
    notFound: function (filename) {
        return {
            intent: "warning",
            message: "Can't find video ../VAT Projects/videos/" + filename,
        }
    },
};

export default function VideoSource(props) {
    const { src, videoHandle, playerDispatch, hidden, projectDispatch } = props;

    const [sourceState, setSourceState] = useState(sourceStates.start);

    const videoRef = useRef(null);

    // Removing default effects on component mount and only handle drop in source element
    useEffect(() => {
        const prevent = (event) => { event.preventDefault() };
        window.addEventListener("dragover", prevent);
        window.addEventListener("drop", prevent);

        return (() => {
            window.removeEventListener("dragover", prevent);
            window.removeEventListener("drop", prevent);
        });
    }, []);

    // When player.src state changes, new video has been added
    // TODO potentially use readyState instead?
    useEffect(() => {
        if (src) {
            setSourceState(sourceStates.success);
        } else {
            setSourceState(sourceStates.start);
        }
    }, [src]);

    useEffect(() => {
        if (typeof (videoHandle) === "string") {
            setSourceState(sourceStates.notFound(videoHandle));
        }
    }, [videoHandle])

    const handleClick = async () => {
        try {
            setSourceState(sourceStates.click);

            // FIXME what to do if appdirhandle can't be retrieved?
            const appDirHandle = await retrieveAppDirHandle();
            const videoHandle = await getVideoHandle(appDirHandle);
            checkCopyLoadVideo(videoHandle);
        } catch (error) {
            setSourceState(sourceStates.start);
        }
    }

    const handleDrop = async (event) => {
        event.preventDefault();

        try {
            if (event.dataTransfer.items.length > 1) {
                setSourceState(sourceStates.multiple);
                return;
            }
            const videoHandle = await event.dataTransfer.items[0].getAsFileSystemHandle();
            checkCopyLoadVideo(videoHandle);
        } catch (error) {
        }
    };

    // Validate input for number of files
    const handleDragOver = (event) => {
        event.preventDefault();
        setSourceState(sourceStates.dragged);
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        setSourceState(sourceStates.start);
    }

    const checkCopyLoadVideo = async (videoHandle) => {
        const video = await videoHandle.getFile();
        const videoDirHandle = await retrieveVideoDirHandle();

        if (await fileExists(video, videoDirHandle)) {
            if (await fileAlreadyInFolder(videoHandle, videoDirHandle)) {
                loadVideo(video, videoHandle);
            } else {
                setSourceState(sourceStates.exists);
            }
        } else if (await validVideo(video)) {
            setSourceState(sourceStates.copying);
            const copiedVideoHandle = await moveFileIntoFolder(video, videoDirHandle);
            const copiedVideo = await copiedVideoHandle.getFile();
            loadVideo(copiedVideo, copiedVideoHandle);
        } else {
            setSourceState(sourceStates.error);
        }
    }

    const validVideo = async (videoFile) => {
        videoRef.current.src = URL.createObjectURL(videoFile);

        // If metadata is loaded, file is probably good
        const validationPromise = () =>
            new Promise(
                (res, rej) => {
                    videoRef.current.onloadedmetadata = res;
                    videoRef.current.onerror = rej;
                    videoRef.current.load();
                });

        try {
            await validationPromise();
            return true;
        } catch (error) {
            return false;
        } finally {
            // Clear video element
            URL.revokeObjectURL(videoRef.current.src);
            videoRef.current.src = "";
            videoRef.current.load();
        }
    };

    const loadVideo = (file, handle) => {
        projectDispatch({
            type: 'ADD_TASK',
            payload: {
                videoHandle: handle,
            }
        });

        // TODO move this into effect in player?
        /*    type: 'SRC_CHANGE',
            payload: {
                src: URL.createObjectURL(file),
                filename: file.name,
            }
        });*/
    }

    return (
        <div
            className={[
                "video-container player-video-source-content",
                sourceState.intent,
                hidden ? "hidden" : ""
            ].join(" ")}

            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}>
            <Icon
                className={"player-video-source-icon"}
                icon="add"
                iconSize={160}
                color={Colors.DARK_GRAY1} />
            <p>{sourceState.message}</p>
            <video
                ref={videoRef}
                hidden={true} />
        </ div >
    );
}