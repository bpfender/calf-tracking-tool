import React from 'react';

import video_src from '../resources/Amfeed 2 3 16-1.m4v';

let FRAME_DELTA = 1 / 20;

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.video = null; // This is set by callback ref in <video> element

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
        this.setCurrentTime(0); // Initialise current time to avoid null ref
    }

    play() {
        this.video.play().catch(console.log("Playback failed")); //TODO proper promise handling
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
            <div>
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
        )
    }
}

export default Video;