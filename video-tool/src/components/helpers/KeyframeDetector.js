import { Button, ProgressBar } from '@blueprintjs/core';
import { bmvbhash } from 'blockhash-core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { hammingDistance } from '../utils';
import { getTimeAsFrames } from '../video/video-functions';
import { keyframeButtonStates, keyframeProgressStates, keyframeState } from './keyframeStates';

const HAMMING_THRESHOLD = 6;
const FRAME_SKIP = 4;
const HASH_BITS = 16;
const VIDEO_SCALING = 3;

// TODO handle error, handle new files
export function KeyframeDetector(props) {
    const { src, framerate, projectDispatch, keyframes } = props;

    const [forceUpdate, setTriggerUpdate] = useState(0);

    const [state, setState] = useState(keyframeState.waiting);
    const [buttonState, setButtonState] = useState(keyframeButtonStates.waiting);
    const [progressState, setProgressState] = useState(keyframeProgressStates.ready);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const rateAverage = useRef(null);
    const keyframesArray = useRef([1]);
    const callbackId = useRef(null);
    const dimensions = useRef({ width: 0, height: 0 });

    // Set up canvas context when component mounts
    useEffect(() => {
        contextRef.current = canvasRef.current.getContext('2d');

        const video = videoRef.current;
        return (() => {
            video.cancelVideoFrameCallback(callbackId.current)
            video.src = "";
            video.load();
        });
    }, [])

    // Check if keyframes are present in task
    useEffect(() => {
        if (keyframes.size > 0) {
            setState(keyframeState.done);
        } else {
            setState(keyframeState.waiting);
        }
    }, [keyframes, src])

    useEffect(() => {
        if (src) {
            videoRef.current.src = src;
            videoRef.current.load();
        } else {
            setState(keyframeState.waiting);
        }
    }, [src, forceUpdate])

    useEffect(() => {
        videoRef.current.cancelVideoFrameCallback(callbackId.current);

        keyframesArray.current = [1];
        rateAverage.current = { mean: 1, count: 0 };

        const hashingCallback = (metadata, prevHash = null, prevFrame = 1) => {
            const currFrame = getTimeAsFrames(metadata.mediaTime, framerate);
            console.log(framerate, currFrame, metadata.mediaTime);

            const { width, height } = dimensions.current;

            contextRef.current.drawImage(videoRef.current, 0, 0, width, height)
            const imageData = contextRef.current.getImageData(0, 0, width, height);
            const hash = bmvbhash(imageData, HASH_BITS);
            let nextHash = null;

            if (prevHash) {
                const hamming = hammingDistance(prevHash, hash);
                if (hamming > HAMMING_THRESHOLD) {
                    keyframesArray.current.push(currFrame);
                    nextHash = hash;
                    console.log(videoRef.current.playbackRate, currFrame, hamming);
                } else {
                    nextHash = prevHash;
                }
            } else {
                nextHash = hash;
            }

            if (currFrame - prevFrame > FRAME_SKIP &&
                videoRef.current.playbackRate > 1.2) {
                videoRef.current.playbackRate -= 0.2;
            } else if (currFrame - prevFrame < FRAME_SKIP &&
                videoRef.current.playbackRate < 15.8) {
                videoRef.current.playbackRate += 0.2;
            }

            callbackId.current = videoRef.current.requestVideoFrameCallback(
                (now, metadata) => {
                    hashingCallback(metadata, nextHash, currFrame);
                })
        };

        callbackId.current = videoRef.current.requestVideoFrameCallback(
            (now, metadata) => {
                hashingCallback(metadata)
            })

    }, [framerate, forceUpdate]);

    useEffect(() => {
        console.log(Object.keys(keyframeState)[state]);
        switch (state) {
            case keyframeState.waiting:
                setButtonState(keyframeButtonStates.waiting);
                setProgressState(keyframeProgressStates.ready);
                break;
            case keyframeState.ready:
                setButtonState(keyframeButtonStates.ready);
                setProgressState(keyframeProgressStates.ready);
                break;
            case keyframeState.processing:
                // Do nothing
                break;
            case keyframeState.cancel:
                setButtonState(keyframeButtonStates.cancel);
                break;
            case keyframeState.done:
                setButtonState(keyframeButtonStates.done);
                setProgressState(keyframeProgressStates.done);
                break;
            case keyframeState.reset:
                setButtonState(keyframeButtonStates.reset);
                setProgressState(keyframeProgressStates.done);
                break;
            default:

            //throw new Error("Unrecognised keyframe state");
        }
    }, [state])

    const handleClick = async () => {
        switch (state) {
            case keyframeState.ready: {
                setState(keyframeState.processing);
                await videoRef.current.play();
                break;
            }
            case keyframeState.cancel: {
                setState(keyframeState.waiting);

                setTriggerUpdate(forceUpdate + 1);
                break;
            }
            case keyframeState.reset: {
                projectDispatch({
                    type: 'SET_KEYFRAMES',
                    payload: { keyframes: [] }
                });

                setTriggerUpdate(forceUpdate + 1);
                break;
            }
            case keyframeState.processing: {
                // Do nothing
                break;
            }
            default:
            //throw new Error("Unrecognised keyframe click state");
        }
    };

    const handleMouseEnter = () => {
        if (state === keyframeState.processing) {
            setState(keyframeState.cancel);
        } else if (state === keyframeState.done) {
            setState(keyframeState.reset);
        }
    };

    const handleMouseLeave = () => {
        if (state === keyframeState.cancel) {
            setState(keyframeState.processing);
        } else if (state === keyframeState.reset) {
            setState(keyframeState.done);
        }
    };

    const handleTimeUpdate = () => {
        console.log(Object.keys(keyframeState)[state]);
        switch (state) {
            case keyframeState.waiting: {
                setState(keyframeState.ready);
                break;
            }
            case keyframeState.ready: {
                // Do nothing
                break;
            }
            case keyframeState.processing: {
                const remaining = formatTime(getTimeRemaining());
                const progress = getProgress();
                setButtonState(keyframeButtonStates.processing(remaining));
                setProgressState(keyframeProgressStates.processing(progress));
                break;
            }
            case keyframeState.cancel: {
                const progress = getProgress();
                setProgressState(keyframeProgressStates.processing(progress));
                break;
            }
            case keyframeState.done: {
                // Do nothing
                break;
            }
            default: {
                // throw new Error("Timeupdate unknown keyframe state");
            }
        }
    };

    const handleEnded = () => {
        projectDispatch({
            type: 'SET_KEYFRAMES',
            payload: { keyframes: keyframesArray.current }
        });

        videoRef.current.cancelVideoFrameCallback(callbackId.current);
        videoRef.current.pause();
    };

    const handleLoadedMetadata = () => {
        dimensions.current = {
            width: videoRef.current.videoWidth / VIDEO_SCALING,
            height: videoRef.current.videoHeight / VIDEO_SCALING,
        };
    }

    const getTimeRemaining = () => {
        const remain = videoRef.current.duration - videoRef.current.currentTime;

        const average = rateAverage.current.mean;
        const count = rateAverage.current.count;

        const newAverage = (average * count + videoRef.current.playbackRate) / (count + 1);

        rateAverage.current.mean = newAverage;
        rateAverage.current.count++;

        return remain / newAverage;
    };

    const getProgress = () => {
        return videoRef.current.currentTime / videoRef.current.duration;
    }

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const h = date.getUTCHours();
        const m = date.getUTCMinutes() + h * 60;
        const s = date.getUTCSeconds();

        return [m, s]
            .map(e => e < 10 ? `0${e}` : `${e}`)
            .join(':');
    };

    return (
        <div className="helper-keyframe-bar">
            <Button
                className="helper-keyframe-button"
                outlined={true}
                icon={buttonState.icon}
                intent={buttonState.intent}
                disabled={buttonState.disabled}
                text={buttonState.text}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} />
            <ProgressBar
                className="helper-keyframe-progress"
                animate={progressState.animate}
                intent={progressState.intent}
                value={progressState.value} />

            <div
                hidden={true}>
                <video
                    width={dimensions.current.width}
                    height={dimensions.current.height}
                    muted={true}
                    ref={videoRef}
                    src={src ? src : null}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onLoadedMetadata={handleLoadedMetadata} />
                <canvas
                    width={dimensions.current.width}
                    height={dimensions.current.height}
                    ref={canvasRef} />
            </div>
        </div>


    )
}