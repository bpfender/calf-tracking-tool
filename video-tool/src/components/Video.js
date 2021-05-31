import React from 'react';

import video_src from '../resources/Amfeed 2 3 16-1.m4v';

let FPS = 20
let FRAME_DELTA = 1 / FPS;

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.video = null; // This is set by callback ref in <video> element
        this.canvas = null;
        this.ctx = null;

        // Canvas drawing
        this.handleFrameUpdate = this.handleFrameUpdate.bind(this);
        this.drawFrameToCanvas = this.drawFrameToCanvas.bind(this);

        // Video control
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.nextFrame = this.nextFrame.bind(this);
        this.prevFrame = this.prevFrame.bind(this);
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.getCurrentFrame = this.getCurrentFrame.bind(this);
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
        this.getFramesAsTime = this.getFramesAsTime.bind(this);
    }

    // TODO not quite sure about lifecycle and where forceupdates() are needed
    componentDidMount() {
        this.ctx = this.canvas.getContext('2d'); // Setup canvas context

        this.video.requestVideoFrameCallback(this.handleFrameUpdate);

        this.setCurrentTime(0); // Initialise current time to avoid null ref. TODO, not sure this is actually required
    }

    handleFrameUpdate(now, metadata) {
        this.calculateFPS(now);

        console.log("NEXT FRAME:")
        console.log("Media time (callback): " + metadata.mediaTime);
        console.log("Current time: " + this.getCurrentTime());
        console.log("VSYNC?: " + (metadata.expectedDisplayTime - now))
        console.log("Callback frame: " + (1 + (metadata.mediaTime * FPS)));
        console.log("Calculated frame: " + this.getCurrentFrame());


        this.drawFrameToCanvas();
        this.video.requestVideoFrameCallback(this.handleFrameUpdate);

        // TODO add a requestAnimationFrame() to ensure vsync? Might be possible to rely on video callback
    }

    drawFrameToCanvas() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    }

    // FIXME this is very rudimentary currently. Will need to be integrated into setup routine
    calculateFPS(now) {
        if (typeof this.calculateFPS.start_time == 'undefined') {
            this.calculateFPS.start_time = 0.0;
            this.calculateFPS.count = 0;
        }

        if (this.calculateFPS.start_time === 0.0) {
            this.calculateFPS.start_time = now;
        }

        let elapsed = (now - this.calculateFPS.start_time) / 1000.0;
        let fps = ++this.calculateFPS.count / elapsed;

        if (this.calculateFPS.count > 40) {
            this.calculateFPS.start_time = 0.0;
            this.calculateFPS.count = 0;
            console.log(Math.floor(fps));
        }
    }

    play() {
        this.video.play().catch(console.log("Playback failed")); //FIXME proper promise handling
    }

    pause() {
        this.video.pause();
    }

    nextFrame(n = 1) {
        this.setCurrentTime(this.getCurrentTime() + this.getFramesAsTime(n));
    }

    prevFrame(n = 1) {
        this.setCurrentTime(this.getCurrentTime() - this.getFramesAsTime(n));
    }

    getCurrentTime() {
        return this.video.currentTime;
    }

    setCurrentTime(time) {
        this.video.currentTime = time;
    }

    getCurrentFrame() {
        return this.getCurrentTime() / FRAME_DELTA;
    }

    setCurrentFrame(n) {
        this.setCurrentTime(this.getFramesAsTime(n));
    }

    getFramesAsTime(n) {
        return n * FRAME_DELTA;
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