export function getFramesAsTime(n, fps) {
    return n / fps;
}

export function getTimeAsFrames(time, fps) {
    return Math.floor(time * fps + 1); // +1 starting frame offset
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