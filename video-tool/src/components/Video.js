import React from 'react';

import video_src from '../resources/Amfeed 2 3 16-1.m4v';

let FPS = 20.0
let FRAME_DELTA = 1 / FPS;

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.video = null; // This is set by callback ref in <video> element
        this.canvas = null;
        this.ctx = null;
        this.videoFrameCallbackMetadata = null;

        // Canvas drawing
        this.handleFrameUpdate = this.handleFrameUpdate.bind(this);
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
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.getCurrentFrame = this.getCurrentFrame.bind(this);
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
        this.getFramesAsTime = this.getFramesAsTime.bind(this);
    }

    // TODO not quite sure about lifecycle and where forceupdates() are needed
    componentDidMount() {
        this.seekTime(0); // Initialise current time to avoid null ref. TODO, not sure this is actually required

        this.ctx = this.canvas.getContext('2d'); // Setup canvas context

        this.video.requestVideoFrameCallback(this.handleFrameUpdate);
    }

    /* ---- CANVAS DRAWING ---- */
    handleFrameUpdate(now, metadata) {
        this.videoFrameCallbackMetadata = metadata;

        this.props.setFrameCallbackState();

        console.log("NEXT FRAME:")
        console.log("Media time (callback): " + metadata.mediaTime);
        console.log("Current time: " + this.getMediaTime());
        console.log("VSYNC?: " + (metadata.expectedDisplayTime - now))
        console.log("Callback frame: " + (1 + (metadata.mediaTime * FPS)));
        console.log("Calculated frame: " + this.getCurrentFrame());


        this.drawFrameToCanvas();
        this.video.requestVideoFrameCallback(this.handleFrameUpdate);

        // TODO add a requestAnimationFrame() to ensure vsync? Might be possible to rely on video callback
    }

    drawFrameToCanvas() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(this.drawFrameToCanvas);
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

    changeFramesToSkip() {

    }


    /* ---- VIDEO UTILS ---- */
    getMediaTime() {
        return this.videoFrameCallbackMetadata.mediaTime;
    }

    getCurrentTime() {
        return this.video.currentTime;
    }

    setCurrentTime(time) {
        this.video.currentTime = time;
    }

    getCurrentFrame() {
        return (this.getMediaTime() * FPS + 1); // adding starting frame offset
    }

    setCurrentFrame(n) {
        this.setCurrentTime(this.getFramesAsTime(n));
    }

    getFramesAsTime(n) {
        return (n) * FRAME_DELTA;
    }


    render() {
        return (
            <div className="video">
                <div>
                    <h2>VIDEO</h2>
                    <video
                        ref={element => {
                            this.video = element;
                        }}
                        width="100%"
                        src={video_src}
                        controls={true}
                    >

                        <p>ERROR: Video not supported</p>
                    </video>
                </div>
                <div>
                    <h2>CANVAS</h2>
                    <canvas
                        ref={element => {
                            this.canvas = element;
                        }}
                        width="800px"
                        height="600px"
                    >
                    </canvas>
                </div>
            </div>
        )
    }
}

export default Video;