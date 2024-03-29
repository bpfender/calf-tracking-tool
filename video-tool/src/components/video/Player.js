import React, { useEffect, useRef, useState } from 'react';
import Video from './Video';
import ControlBar from '../controls/ControlBar';
import Annotation from './Annotation.js';
import "./Player.scss";
import { VideoBar } from './VideoBar';
import VideoSource from './VideoSource';
import { getFrameOffset, nextFrame, pause, play, prevFrame, seekFrame } from './video-functions';

import { useDimensions } from './useDimensions';
import { keyCode, useKeydown } from './useKeydown';

//FIXME position of video isn't quite right yet. Not sure what's happen
function Player(props) {
    const {
        annotations, projectDispatch, project,
        playerState, playerDispatch, videoRef
        , canUndo, canRedo } = props;

    const [hidden, setHidden] = useState(false);

    const videoContainerRef = useRef(null);
    const videoDimensions = useDimensions(videoRef);

    const key = useKeydown();

    useEffect(() => {
        console.log(key);
        if (key) {
            switch (key.keyCode) {
                case keyCode.c: {
                    projectDispatch({
                        type: 'CONFIRM_FRAME',
                        payload: { frame: playerState.currentFrame }
                    });
                    break;
                }
                case keyCode.x: {
                    projectDispatch({
                        type: 'REJECT_FRAME',
                        payload: { frame: playerState.currentFrame }
                    });
                    break;
                }
                case keyCode.space: {
                    playerState.paused ?
                        play(videoRef.current) :
                        pause(videoRef.current, playerState.mediaTime, playerState.vsync);

                    break;
                }
                case keyCode.arrowRight: {
                    let n = 1;
                    if (key.ctrlKey) {
                        n = playerState.framesToSkip;
                    }
                    nextFrame(videoRef.current, playerState.currentFrame, playerState.framerate, n);
                    break;
                }
                case keyCode.arrowLeft: {
                    let n = 1;
                    if (key.ctrlKey) {
                        n = playerState.framesToSkip;
                    }
                    prevFrame(videoRef.current, playerState.currentFrame, playerState.framerate, n);
                    break;
                }
                case keyCode.bracketRight: {
                    const nextKeyframe = annotations.keyframes.find(val => val > playerState.currentFrame, this, -1);
                    if (nextKeyframe > 0) {
                        seekFrame(videoRef.current, nextKeyframe, playerState.framerate);
                    }
                    break;
                }
                case keyCode.bracketLeft: {
                    const prevKeyframe = annotations.keyframes.findLast(val => val < playerState.currentFrame, this, -1);
                    if (prevKeyframe > 0) {
                        seekFrame(videoRef.current, prevKeyframe, playerState.framerate);
                    }
                    break;
                }
                case keyCode.z: {
                    if (canUndo) {
                        if (key.ctrlKey) {
                            projectDispatch({
                                type: 'UNDO'
                            });
                        }
                    } break;
                }
                case keyCode.y: {
                    if (canRedo) {

                        if (key.ctrlKey) {
                            projectDispatch({
                                type: 'REDO'
                            });
                        }
                    }
                    break;
                }
                case keyCode.semicolon: {
                    const task = project.getSelectedTask();
                    const prevReviewed = task.reviewed.findLast(val => val < playerState.currentFrame, this, -1);
                    if (prevReviewed > 0) {
                        seekFrame(videoRef.current, prevReviewed, playerState.framerate);
                    }
                    break;
                }
                case keyCode.apost: {
                    const task = project.getSelectedTask();
                    const nextReviewed = task.reviewed.find(val => val > playerState.currentFrame, this, -1);
                    if (nextReviewed > 0) {
                        seekFrame(videoRef.current, nextReviewed, playerState.framerate);
                    }
                    break;
                }
                case keyCode.comma: {
                    const task = project.getSelectedTask();
                    if (task.selected) {
                        const track = task.getSelectedTrack();
                        const prevAnchor = track.anchors.findLast(val => val < playerState.currentFrame, this, -1);
                        if (prevAnchor > 0) {
                            seekFrame(videoRef.current, prevAnchor, playerState.framerate);
                        }
                    }
                    break;
                }
                case keyCode.dot: {
                    const task = project.getSelectedTask();
                    if (task.selected) {
                        const track = task.getSelectedTrack();
                        const nextAnchor = track.anchors.find(val => val > playerState.currentFrame, this, -1);
                        if (nextAnchor > 0) {
                            seekFrame(videoRef.current, nextAnchor, playerState.framerate);
                        }
                    }
                    break;
                }
                default:
                    break;
            }
        }

    }, [key])

    // Initialise component with video elements hidden
    useEffect(() => {
        videoContainerRef.current.hidden = true;
    }, [videoContainerRef]);

    useEffect(() => {
        if (playerState.framerate === 0) {
            videoContainerRef.current.hidden = true
            setHidden(false);
        } else {
            setTimeout(() => {
                videoContainerRef.current.hidden = false;
                setHidden(true);
            }, 500);
        }
    }, [playerState.framerate]);

    const isReviewed = () => {
        if (playerState.paused) {
            return annotations.isReviewed(playerState.currentFrame);
        }

        return false;
    };

    const isKeyframe = () => {
        return playerState.paused ?
            annotations.isKeyframe(playerState.currentFrame)
            : false;
    };

    const anchor = () => {
        if (playerState.paused) {
            const track = annotations.getSelectedTrack();
            if (track) {
                if (track.isAnchor(playerState.currentFrame)) {
                    return track.colour;
                }
            }
        }
        return null;
    };

    return (
        <div className={props.className}>
            <div className="video-content">
                <VideoBar
                    filename={playerState.filename}
                    src={playerState.src}
                    framerate={playerState.framerate}
                    videoWidth={playerState.videoWidth}
                    videoHeight={playerState.videoHeight}
                    projectDispatch={projectDispatch}
                    isReviewed={isReviewed()}
                    isKeyframe={isKeyframe()}
                    isAnchor={anchor()}
                    currentFrame={playerState.currentFrame}
                />
                <VideoSource
                    src={playerState.src}
                    hidden={hidden}
                    videoHandle={annotations.videoHandle}
                    projectDispatch={projectDispatch}
                    playerDispatch={playerDispatch} />
                <div
                    ref={videoContainerRef}
                    className="video-container">
                    <div className="video-window-container">
                        <Video
                            videoRef={videoRef}
                            playerDispatch={playerDispatch}
                            src={playerState.src}
                            currentFrame={playerState.currentFrame}
                            mediaTime={playerState.mediaTime}
                            framerate={playerState.framerate}
                            readyState={playerState.readyState}
                            vsync={playerState.vsync}
                            paused={playerState.paused}
                            seeking={playerState.seeking} />
                        <Annotation
                            className="video-window annotation-overlay"
                            videoDimensions={videoDimensions}
                            currentFrame={playerState.currentFrame}
                            annotations={annotations}
                            projectDispatch={projectDispatch}
                            pauseVideo={() => { videoRef.current.pause() }} />
                    </div>
                </div>

            </div>
            <ControlBar
                videoRef={videoRef}
                playerDispatch={playerDispatch}
                totalFrames={playerState.totalFrames}
                duration={playerState.duration}
                src={playerState.src}
                mediaTime={playerState.mediaTime}
                paused={playerState.paused}
                seeking={playerState.seeking}
                currentFrame={playerState.currentFrame}
                framerate={playerState.framerate}
                framesToSkip={playerState.framesToSkip}
                playbackRate={playerState.playbackRate}
                vsync={playerState.vsync} />
        </div >
    );
}

export default Player;
