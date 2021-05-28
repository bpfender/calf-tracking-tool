import React from 'react';

import video_src from '../resources/Amfeed 2 3 16-1.m4v';

let FRAME_DELTA = 1 / 20;

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.video = null; // This is set by callback ref in <video> element
        this.canvas = null;
        this.ctx = null;

        this.drawFrameToCanvas = this.drawFrameToCanvas.bind(this);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.nextFrame = this.nextFrame.bind(this);
        this.prevFrame = this.prevFrame.bind(this);
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.getCurrentFrame = this.getCurrentFrame.bind(this);
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
        this.getFramesAsTime = this.getFramesAsTime.bind(this);

    }

    componentDidMount() {
        this.ctx = this.canvas.getContext('2d'); // Setup canvas context
        this.video.requestVideoFrameCallback(this.drawFrameToCanvas);

        this.setCurrentTime(0); // Initialise current time to avoid null ref
    }

    drawFrameToCanvas() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        this.video.requestVideoFrameCallback(this.drawFrameToCanvas);
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
            <div class="video">
                <div>
                    <h2>VIDEO</h2>
                    <video
                        ref={element => {
                            this.video = element;
                        }}
                        width="100%"
                        src={video_src}
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