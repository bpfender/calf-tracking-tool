import React from 'react';
import "./Video.scss";

import video_src from '../../resources/Amfeed 2 3 16-1 23976fps timecode.mp4';

let FPS = 23.976;
let FRAME_DELTA = 1 / FPS;

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.video = null; // This is set by callback ref in <video> element
        this.canvas = null;
        this.ctx = null;
        this.videoFrameCallbackMetadata = null;

        // Frame callbacks
        this.handleVideoFrameCallback = this.handleVideoFrameCallback.bind(this);
        this.drawFrameToCanvas = this.drawFrameToCanvas.bind(this);

        // Video control
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.nextFrame = this.nextFrame.bind(this);
        this.prevFrame = this.prevFrame.bind(this);
        this.seekTime = this.seekTime.bind(this);
        this.seekFrame = this.seekFrame.bind(this);
        this.rewind = this.seekFrame.bind(this);
        this.changePlaybackRate = this.changePlaybackRate.bind(this);
        this.changeFramesToSkip = this.changeFramesToSkip.bind(this);

        // Video utils
        this.getMediaTime = this.getMediaTime.bind(this);
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
        this.seekTime(FRAME_DELTA / 2); // Initialise current time to avoid null ref. TODO, not sure this is actually required
        this.ctx = this.canvas.getContext('2d'); // Setup canvas context

        this.video.requestVideoFrameCallback(this.handleVideoFrameCallback); // Setup frame callback
    }

    /* ---- FRAME CALLBACKS ---- */
    //TODO this is a bit messy. Needs to be tidied
    //TODO need to check for compatibility with callback
    handleVideoFrameCallback(now, metadata) {

        // TODO does this need to be set seperately? 
        this.videoFrameCallbackMetadata = metadata;
        // FIXME passing more data than needed at the moment
        const payload = {
            ...metadata,
            currentFrame: this.getCurrentFrame()
        };
        this.props.playerDispatch({ type: 'FRAME_CALLBACK', payload: { ...payload } });
        //calcFPS2(metadata);
        this.drawFrameToCanvas();
        this.video.requestVideoFrameCallback(this.handleVideoFrameCallback);
    }

    drawFrameToCanvas() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    }

    /* ---- VIDEO CONTROLS ---- */
    play() {
        this.video.play().catch(console.log("Playback failed")); //FIXME proper promise handling
    }

    pause() {
        this.video.pause();
    }

    nextFrame(n = 1) {
        this.setCurrentTime(this.getMediaTime() + FRAME_DELTA / 2 + this.getFramesAsTime(n));
    }

    prevFrame(n = 1) {
        this.setCurrentTime(this.getMediaTime() + FRAME_DELTA / 2 - this.getFramesAsTime(n));
    }

    seekTime(time) {
        this.setCurrentTime(time);
    }

    seekFrame(frame) {
        this.setCurrentFrame(frame);
    }

    rewind() {
        this.setCurrentTime(0);
    }

    changePlaybackRate(rate) {
        this.video.playbackRate = rate;
    }

    changeFramesToSkip(n) {
        this.props.playerDispatch({ type: 'FRAMES_TO_SKIP', payload: { framesToSkip: n } })
    }

    // TODO is this needed?
    changeTimeToSkip(t) {
        this.props.playerDispatch({ type: 'TIME_TO_SKIP', payload: { timeToSkip: t } });
    }

    /* ---- VIDEO UTILS ---- */
    // Only care about media time idenfied in video frame callback as it's more accurate
    getMediaTime() {
        return this.videoFrameCallbackMetadata.mediaTime;
    }

    setCurrentTime(time) {
        this.video.currentTime = time;
    }

    getCurrentFrame() {
        //FIXME potentially shouldn't be round(). considering FRAME_DELTA!
        return (Math.round(this.getMediaTime() * FPS + 1)); // adding starting frame offset
    }

    setCurrentFrame(n) {
        this.setCurrentTime(this.getFramesAsTime(n) - FRAME_DELTA / 2); //TODO why am i minusing here?
    }

    getFramesAsTime(n) {
        return (n) * FRAME_DELTA;
    }

    // FIXME naughty subtraction. Not 100% sure why
    getTimeAsFrames(t) {
        return Math.floor(t * FPS - 1);
    }

    /* ---- VIDEO EVENTS ---- */
    // TODO not sure about how to handle abort currently
    handleAbort() {
        this.props.playerDispatch({ type: 'ABORT' });
    }

    handleCanPlay() {
        const payload = {
            readyState: this.video.readyState
        };
        this.props.playerDispatch({ type: 'CAN_PLAY', payload: { ...payload } });
    }

    handleCanPlayThrough() {
        const payload = {
            readyState: this.video.readyState
        };
        this.props.playerDispatch({ type: 'CAN_PLAY_THROUGH', payload: { ...payload } });
    }

    handleDurationChange() {
        const payload = {
            duration: this.video.duration,
            totalFrames: this.getTimeAsFrames(this.video.duration),
        };
        this.props.playerDispatch({ type: 'DURATION_CHANGE', payload: { ...payload } });
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
        const payload = {
            error: this.video.error
        };

        this.props.playerDispatch({ type: 'ERROR', payload: { ...payload } });
    }

    handleLoadedData() {
        const payload = {
            readyState: this.video.readyState,
        };

        this.props.playerDispatch({ type: 'LOADED_DATA', payload: { ...payload } });
    }

    handleLoadedMetadata() {
        const payload = {
            readyState: this.video.readyState,
            videoWidth: this.video.videoWidth,
            videoHeight: this.video.videoHeight
        };

        this.props.playerDispatch({ type: 'LOADED_METADATA', payload: { ...payload } });
    }

    handleLoadStart() {
        const payload = {
            readyState: this.video.readyState
        };
        this.props.playerDispatch({ type: 'LOAD_START', payload: { ...payload } });
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
        const payload = {
            playbackRate: this.video.playbackRate
        };

        this.props.playerDispatch({ type: 'RATE_CHANGE', payload: { ...payload } })
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
                    onWaiting={this.handleWaiting}
                >
                    <p>ERROR: Video not supported</p>
                </video>
                <canvas
                    className="video-canvas"
                    ref={element => {
                        this.canvas = element;
                    }}
                    width="800px"
                    height="600px"
                >
                </canvas>
            </div>
        )
    }
}

export default Video;