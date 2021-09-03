import React from 'react';
import "./Video.scss";

import video_src from '../../resources/Amfeed 2 3 16-1 23976fps timecode.mp4';
import { calculateFramerate } from '../components/video/video-functions';

let FPS = 23.976;
let FRAME_DELTA = 1 / FPS;

// FIXME video slider time select sometimes off by frame (is this just incorrect seeking)?
// TODO needs to be rewritten functionally really
class Video extends React.Component {
    constructor(props) {
        super(props);

        this.video = null; // This is set by callback ref in <video> element
        this.canvas = null;
        this.ctx = null;
        this.videoFrameCallbackMetadata = null;
        this.fps = props.fps;
        this.frame_delta = 1 / props.fps;

        // Frame callbacks
        this.framerateCalcCallback = this.framerateCalcCallback.bind(this);
        this.handleVideoFrameCallback = this.handleVideoFrameCallback.bind(this);
        this.drawFrameToCanvas = this.drawFrameToCanvas.bind(this);

        // Video control
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.nextFrame = this.nextFrame.bind(this);
        this.prevFrame = this.prevFrame.bind(this);
        this.seekTime = this.seekTime.bind(this);
        this.seekFrame = this.seekFrame.bind(this);
        this.rewind = this.rewind.bind(this);
        this.changePlaybackRate = this.changePlaybackRate.bind(this);
        this.changeFramesToSkip = this.changeFramesToSkip.bind(this);

        // Video utils
        this.getMediaTime = this.getMediaTime.bind(this);
        this.getFrameTime = this.getFrameTime.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.getCurrentFrame = this.getCurrentFrame.bind(this);
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
        this.getFramesAsTime = this.getFramesAsTime.bind(this);

        //Video events
        this.handleAbort = this.handleAbort.bind(this);
        this.handleCanPlay = this.handleCanPlay.bind(this);
        this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleEmptied = this.handleEmptied.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleLoadedData = this.handleLoadedData.bind(this);
        this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
        this.handleLoadStart = this.handleLoadStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePlaying = this.handlePlaying.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleSeeked = this.handleSeeked.bind(this);
        this.handleSeeking = this.handleSeeking.bind(this);
        this.handleStalled = this.handleStalled.bind(this);
        this.handleSuspend = this.handleSuspend.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleWaiting = this.handleWaiting.bind(this);
    }

    // TODO not quite sure about lifecycle and where forceupdates() are needed
    componentDidMount() {
        //this.seekTime(this.frame_delta / 2); // Initialise current time to avoid null ref. TODO, not sure this is actually required
        this.ctx = this.canvas.getContext('2d'); // Setup canvas context
        this.video.requestVideoFrameCallback(this.handleVideoFrameCallback);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.src !== this.props.src) {
            this.video.src = this.props.src;
            this.video.load();
        }

        if (this.props.readyState === 4 && this.props.fps === 0) {
            /*this.video.requestVideoFrameCallback((now, metadata) => {
                this.framerateCalcCallback(metadata)
            })
            this.play();*/
            calculateFramerate(this.video).then(val => {
                this.props.playerDispatch({
                    type: 'SET_FRAMERATE',
                    payload: {
                        framerate: val,
                    }
                });
            });

        }

        if (prevProps.fps === 0) {
            this.fps = this.props.fps;
            this.frame_delta = 1 / this.fps;
        }
    }

    framerateCalcCallback(metadata, prev = [0, 0, 0]) {
        const frames = metadata.presentedFrames;
        const time = metadata.mediaTime;
        const [prevTime, prevFrames, prevFps] = prev;

        const fps = Math.round((frames - prevFrames) / (time - prevTime) * 1000);
        // // console.log(fps, prevFps, frames, prevFrames, time, prevTime);

        if (fps === prevFps) {
            this.video.pause();

            this.props.playerDispatch({
                type: 'SET_FRAMERATE',
                payload: {
                    framerate: fps / 1000,
                }
            });
            this.rewind();
            this.video.requestVideoFrameCallback(this.handleVideoFrameCallback);
        } else {
            this.video.requestVideoFrameCallback((now, metadata) => {
                this.framerateCalcCallback(metadata, [time, frames, fps])
            })
        }
    }

    /* ---- FRAME CALLBACKS ---- */
    //TODO need to check for compatibility with callback
    // FIXME metadata passing more data than needed at the moment
    handleVideoFrameCallback(now, metadata) {
        this.videoFrameCallbackMetadata = metadata;
        this.props.playerDispatch({
            type: 'FRAME_CALLBACK',
            payload: {
                vsync: metadata.expectedDisplayTime - now,
                ...metadata,
                currentFrame: this.getCurrentFrame()
            }
        });

        this.drawFrameToCanvas();
        this.video.requestVideoFrameCallback(this.handleVideoFrameCallback);
    }

    drawFrameToCanvas() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    }

    /* ---- VIDEO CONTROLS ---- */
    play() {
        this.video.play(); //FIXME proper promise handling
    }

    pause() {
        this.video.pause();
        // FIXME empirical value of 0.1us for vsync value
        // https://web.dev/requestvideoframecallback-rvfc/
        if (this.props.vsync < 0.1) {
            this.setCurrentTime(this.getMediaTime());
        }
    }

    load() {
        this.video.load();
    }

    nextFrame(n = 1) {
        this.setCurrentTime(this.getFrameTime() + this.getFramesAsTime(n));
    }

    prevFrame(n = 1) {
        this.setCurrentTime(this.getFrameTime() - this.getFramesAsTime(n));
    }


    //FIXME redundant functions
    seekTime(time) {
        this.setCurrentTime(time);
    }

    seekFrame(frame) {
        this.setCurrentFrame(frame);
    }

    rewind() {
        this.setCurrentTime(0.0);
    }

    changePlaybackRate(rate) {
        this.video.playbackRate = rate;
    }

    changeFramesToSkip(n) {
        this.props.playerDispatch({
            type: 'FRAMES_TO_SKIP',
            payload: { framesToSkip: n }
        });
    }

    // TODO is this needed?
    changeTimeToSkip(t) {
        this.props.playerDispatch({
            type: 'TIME_TO_SKIP',
            payload: { timeToSkip: t }
        });
    }

    /* ---- VIDEO UTILS ---- */
    // Only care about media time idenfied in video frame callback as it's more accurate
    getMediaTime() {
        return this.videoFrameCallbackMetadata.mediaTime;
    }

    // Frame time is defined as halfway through frame, to allow next/prev navigation. Media time
    // appear to be beginning of frame
    getFrameTime() {
        return this.getMediaTime() + this.frame_delta / 2;
    }

    setCurrentTime(time) {
        this.video.currentTime = time;
    }

    getCurrentFrame() {
        return (Math.round(this.getMediaTime() * this.fps + 1)); // adding starting frame offset
    }

    setCurrentFrame(n) {
        this.setCurrentTime(this.getFramesAsTime(n) - this.frame_delta / 2);
    }

    getFramesAsTime(n) {
        return (n) * this.frame_delta;
    }

    getTimeAsFrames(t) {
        return Math.floor(t * this.fps + 1);
    }

    /* ---- VIDEO EVENTS ---- */
    // TODO not sure about how to handle abort currently
    handleAbort() {
        this.props.playerDispatch({ type: 'ABORT' });
    }

    handleCanPlay() {
        this.props.playerDispatch({
            type: 'CAN_PLAY',
            payload: { readyState: this.video.readyState }
        });
    }

    handleCanPlayThrough() {
        this.props.playerDispatch({
            type: 'CAN_PLAY_THROUGH',
            payload: { readyState: this.video.readyState }
        });
    }

    handleDurationChange() {
        this.props.playerDispatch({
            type: 'DURATION_CHANGE',
            payload: {
                duration: this.video.duration,
            }
        });
    }

    // TODO not really sure what to do with this event
    handleEmptied() {
        this.props.playerDispatch({ type: 'EMPTIED' });
    }

    // TODO not sure if this is relevant. Ended state doesn't get reset
    handleEnded() {
        this.props.playerDispatch({ type: 'ENDED' });
    }

    // TODO how to handle error gracefully. How to reset error flag
    handleError() {
        this.props.playerDispatch({
            type: 'ERROR',
            payload: { error: this.video.error }
        });
    }

    handleLoadedData() {
        this.props.playerDispatch({
            type: 'LOADED_DATA',
            payload: { readyState: this.video.readyState }
        });
    }

    handleLoadedMetadata() {
        this.props.playerDispatch({
            type: 'LOADED_METADATA',
            payload: {
                readyState: this.video.readyState,
                videoWidth: this.video.videoWidth,
                videoHeight: this.video.videoHeight
            }
        });
    }

    handleLoadStart() {
        this.props.playerDispatch({
            type: 'LOAD_START',
            payload: { readyState: this.video.readyState }
        });
    }

    handlePause() {
        this.props.playerDispatch({ type: 'PAUSE' });
    }

    handlePlay() {
        this.props.playerDispatch({ type: 'PLAY' });
    }

    handlePlaying() {
        this.props.playerDispatch({ type: 'PLAYING' });
    }

    // TODO not really sure what to do with this at the moment
    handleProgress() {
        this.props.playerDispatch({ type: 'PROGRESS' });
    }

    handleRateChange() {
        this.props.playerDispatch({
            type: 'RATE_CHANGE',
            payload: { playbackRate: this.video.playbackRate }
        })
    }

    handleSeeked() {
        this.props.playerDispatch({ type: 'SEEKED' });
    }

    handleSeeking() {
        this.props.playerDispatch({ type: 'SEEKING' });
    }

    // TODO not really sure what to do with this event
    handleStalled() {
        this.props.playerDispatch({ type: 'STALLED' });
    }

    // TODO not really sure what to do with this event
    handleSuspend() {
        this.props.playerDispatch({ type: 'SUSPEND' });
    }

    // FIXME not really needed given videoframecallback
    handleTimeUpdate() {
        this.props.playerDispatch({ type: 'TIME_UPDATE' });
    }

    // TODO not really sure what to do with this event
    handleWaiting() {
        this.props.playerDispatch({ type: 'WAITING' });
    }

    // FIXME width set here explicitly
    render() {
        return (
            <div className={this.props.className}>
                <video
                    className="video-element"
                    ref={element => {
                        this.video = element;
                    }}
                    src={video_src}
                    onAbort={this.handleAbort}
                    onCanPlay={this.handleCanPlay}
                    onCanPlayThrough={this.handleCanPlayThrough}
                    onDurationChange={this.handleDurationChange}
                    onEmptied={this.handleEmptied}
                    onEnded={this.handleEnded}
                    onError={this.handleError}
                    onLoadedData={this.handleLoadedData}
                    onLoadedMetadata={this.handleLoadedMetadata}
                    onLoadStart={this.handleLoadStart}
                    onPause={this.handlePause}
                    onPlay={this.handlePlay}
                    onPlaying={this.handlePlaying}
                    onProgress={this.handleProgress}
                    onRateChange={this.handleRateChange}
                    onSeeked={this.handleSeeked}
                    onSeeking={this.handleSeeking}
                    onStalled={this.handleStalled}
                    onSuspend={this.handleSuspend}
                    onTimeUpdate={this.handleTimeUpdate}
                    onWaiting={this.handleWaiting}>
                    <p>ERROR: Video not supported</p>
                </video>
                <canvas
                    className="video-canvas"
                    ref={element => {
                        this.canvas = element;
                    }}
                >
                </canvas>
            </div >
        )
    }
}

export default Video;