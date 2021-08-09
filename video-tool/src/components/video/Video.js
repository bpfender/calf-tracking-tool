import React, { useCallback, useEffect, useRef } from 'react';
import { defaultPlayerState } from '../state/player-state';
import { HAVE_ENOUGH_DATA } from './video-constants';
import { calculateFramerate, getFrameOffset, getFramesAsTime } from './video-functions';
import "./Video.scss";

export default function Video(props) {
    const {
        videoRef,
        playerDispatch,
        src,
        framerate,
        mediaTime,
        currentFrame,
        readyState,
        vsync } = props;

    console.log(framerate);
    //const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // Setup canvas context when component mounts
    useEffect(() => {
        contextRef.current = canvasRef.current.getContext('2d');
    }, []);

    useEffect(() => {
        //playerDispatch({ type: 'RESET' });
        videoRef.current.load();
    }, [src, videoRef]);

    const handleVideoFrameCallback = useCallback((now, metadata) => {
        playerDispatch({
            type: 'FRAME_CALLBACK',
            payload: {
                ...metadata,
                vsync: metadata.expectedDisplayTime - now,
            }
        })
        videoRef.current.requestVideoFrameCallback(handleVideoFrameCallback);
    }, [playerDispatch, videoRef]);

    useEffect(() => {
        if (readyState === HAVE_ENOUGH_DATA && framerate === 0) {
            console.log("HEELO");
            (async () => {
                const framerate = await calculateFramerate(videoRef.current);
                console.log("SETTING FRAMERATE", framerate);
                playerDispatch({
                    type: 'SET_FRAMERATE',
                    payload: {
                        framerate: framerate,
                    }
                });
                // Register initial callback when video has loaded properly
                videoRef.current.requestVideoFrameCallback(handleVideoFrameCallback);
            })();
        }
    }, [readyState, framerate, playerDispatch, videoRef, handleVideoFrameCallback])

    const play = async () => {
        await videoRef.current.play();
    }

    const pause = () => {
        // FIXME empirical value of 0.1us for vsync value
        // https://web.dev/requestvideoframecallback-rvfc/
        if (vsync < 0.1) {
            seekTime(mediaTime);
        }
    }

    const load = () => {
        videoRef.current.load();
    }

    const setPlaybackRate = (rate) => {
        videoRef.current.playbackRate = rate;
    }

    const seekTime = (time) => {
        videoRef.current.currentTime = time;
    }

    const seekFrame = (frame) => {
        videoRef.current.currentTime = getFramesAsTime(frame, framerate) - getFrameOffset(framerate);
    }

    const rewind = () => {
        seekTime(0);
    }

    const nextFrame = (n = 1) => {
        seekFrame(currentFrame + n);
    }

    const prevFrame = (n = 1) => {
        seekFrame(currentFrame - n);
    }

    // EVENTS
    const handleCanPlayThrough = () => {
        playerDispatch({
            type: 'CAN_PLAY_THROUGH',
            payload: {
                readyState: videoRef.current.readyState,
            },
        });
    }

    const handleDurationChange = () => {
        playerDispatch({
            type: 'DURATION_CHANGE',
            payload: {
                duration: videoRef.current.duration,
            },
        });
    }

    const handleEmptied = () => {
        playerDispatch({
            type: 'EMPTIED',
            payload: { defaultPlayerState }
        })
    }

    const handleLoadedMetadata = () => {
        playerDispatch({
            type: 'LOADED_METADATA',
            payload: {
                readyState: videoRef.current.readyState,
                videoWidth: videoRef.current.videoWidth,
                videoHeight: videoRef.current.videoHeight,
                duration: videoRef.current.duration,
            },
        });
    }

    const handlePause = () => {
        playerDispatch({ type: 'PAUSE' });
    }

    const handlePlay = () => {
        playerDispatch({ type: 'PLAY' });
    }

    const handlePlaying = () => {
        playerDispatch({ type: 'PLAYING' });
    }

    const handleRateChange = () => {
        playerDispatch({
            type: 'RATE_CHANGE',
            payload: { playbackRate: videoRef.current.playbackRate },
        });
    }

    const handleSeeked = () => {
        playerDispatch({ type: 'SEEKED' });
    }

    const handleSeeking = () => {
        playerDispatch({ type: 'SEEKING' });
    }

    return (
        <div className={props.className}>
            <video
                className="video-element"
                ref={videoRef}
                src={src}
                onAbort={() => { }}
                onCanPlay={() => { }}
                onCanPlayThrough={handleCanPlayThrough}
                onDurationChange={handleDurationChange}
                onEmptied={handleEmptied}
                onEnded={() => { }}
                onError={() => { }}
                onLoadedData={() => { }}
                onLoadedMetadata={handleLoadedMetadata}
                onLoadStart={() => { }}
                onPause={handlePause}
                onPlay={handlePlay}
                onPlaying={handlePlaying}
                onProgress={() => { }}
                onRateChange={handleRateChange}
                onSeeked={handleSeeked}
                onSeeking={handleSeeking}
                onStalled={() => { }}
                onSuspend={() => { }}
                onTimeUpdate={() => { }}
                onWaiting={() => { }}>
                <p>ERROR: Video not supported</p>
            </video>
            <canvas
                className="video-canvas"
                ref={canvasRef} />
        </div >
    );
}