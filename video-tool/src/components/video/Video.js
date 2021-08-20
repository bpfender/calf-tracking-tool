import React, { useCallback, useEffect, useRef } from 'react';
import { defaultPlayerState } from '../state/player-reducer';
import { HAVE_ENOUGH_DATA } from './video-constants';
import { calculateFramerate, VideoFunctions } from './video-functions';
import "./Video.scss";

export default function Video(props) {
    const {
        videoRef,
        playerDispatch,
        src,
        readyState,
        framerate } = props;

    useEffect(() => {
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
                const fps = await calculateFramerate(videoRef.current);
                playerDispatch({
                    type: 'SET_FRAMERATE',
                    payload: {
                        framerate: fps,
                    }
                });

                // Register initial callback when video has loaded properly
                videoRef.current.requestVideoFrameCallback(handleVideoFrameCallback);
            })();
        }
    }, [readyState, playerDispatch, videoRef, handleVideoFrameCallback, framerate])

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
                onError={() => { console.log("Video Error") }}
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
        </div >
    );
}