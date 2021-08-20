export class VideoFunctions {
    constructor(videoElem) {
        this.video = videoElem;
        this.framerate = null;
    }

    load() {
        this.video.load();
    }

    setPlaybackRate(rate) {
        this.video.playbackRate = rate;
    }

    async play() {
        await this.video.play();
    }

    pause(vsync, mediaTime) {
        this.video.pause();
        // FIXME empirical value of 0.1us for vsync value
        // https://web.dev/requestvideoframecallback-rvfc/
        if (vsync < 0.1) {
            this.seekTime(mediaTime);
        }
    }

    seekTime(time) {
        this.video.currentTime = time;
    }

    seekFrame(frame) {
        this.seekTime(this.getFramesAsTime(frame) - this.getFrameOffset());
    }

    rewind() {
        this.seekTime(0);
    }

    nextFrame(currFrame, n = 1) {
        this.seekFrame(currFrame + n);
    }

    prevFrame(currFrame, n = 1) {
        this.seekFrame(currFrame - n);
    }

    getFramesAsTime(n) {
        return n / this.framerate;
    }

    getTimeAsFrames(time) {
        return Math.round(time * this.framerate + 1)
    }

    getFrameOffset() {
        return 1 / (this.framerate * 2);
    }


    async calculateFramerate() {
        this.setPlaybackRate(0.25);
        await this.play();

        const framerate = await this.framerateCalcRecurse();

        this.video.pause();
        this.rewind();
        this.setPlaybackRate(1);
    }

    async framerateCalcRecurse(prev = [0, 0, 0]) {
        const metadata = await requestVideoFramePromise(this.video);

        const frames = metadata.presentedFrames;
        const time = metadata.mediaTime;
        const [prevTime, prevFrames, prevFpsScaled] = prev;

        const fpsScaled = Math.round((frames - prevFrames) / (time - prevTime) * 1000);

        if (fpsScaled === prevFpsScaled) {
            return fpsScaled / 1000;
        } else {
            return await this.framerateCalcRecurse([time, frames, fpsScaled]);
        }
    }


    requestVideoFramePromise() {
        return new Promise((resolve) => {
            this.video.requestVideoFrameCallback((now, metadata) => {
                resolve(metadata);
            })
        })
    }

}

export function getFramesAsTime(n, fps) {
    return n / fps;
}

export function getTimeAsFrames(time, fps) {
    return Math.round(time * fps + 1); // +1 starting frame offset
}

// media time is at beginning of given frame, so "frameTime" is
// is defined as halfway through current frame
export function getFrameOffset(fps) {
    return 1 / (fps * 2);
}

export async function calculateFramerate(video, prev = [0, 0, 0]) {
    await video.play();
    const metadata = await requestVideoFramePromise(video)
    const fps = await framerateCalcCallback(video, metadata, prev);
    video.pause();
    video.currentTime = 0;
    return fps;
}

async function framerateCalcCallback(video, metadata, prev) {
    const frames = metadata.presentedFrames;
    const time = metadata.mediaTime;
    const [prevTime, prevFrames, prevFps] = prev;
    const fps = Math.round((frames - prevFrames) / (time - prevTime) * 1000);

    if (fps === prevFps) {
        return fps / 1000;
    } else {
        return await calculateFramerate(video, [time, frames, fps]);
    }
}

const requestVideoFramePromise = (video) => new Promise((resolve) => {
    video.requestVideoFrameCallback((now, metadata) => {
        resolve(metadata);
    });
})

export async function play(video) {
    await video.play();
}

export function pause(video, mediaTime, vsync) {
    video.pause();
    // FIXME empirical value of 0.1us for vsync value
    // https://web.dev/requestvideoframecallback-rvfc/
    if (vsync < 0.1) {
        seekTime(video, mediaTime);
    }
}

export function load(video) {
    video.load();
}

export function seekTime(video, time) {
    video.currentTime = time;
}

export function seekFrame(video, frame, framerate) {
    video.currentTime = getFramesAsTime(frame, framerate) - getFrameOffset(framerate);
}

export function rewind(video) {
    seekTime(video, 0);
}

export function nextFrame(video, currentFrame, framerate, n = 1) {
    seekFrame(video, currentFrame + n, framerate);
}

export function prevFrame(video, currentFrame, framerate, n = 1) {
    seekFrame(video, currentFrame - n, framerate);
}

export function setPlaybackRate(video, rate) {
    video.playbackRate = rate;
}