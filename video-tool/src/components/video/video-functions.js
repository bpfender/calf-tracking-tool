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
    return fps;
}

async function framerateCalcCallback(video, metadata, prev) {
    const frames = metadata.presentedFrames;
    const time = metadata.mediaTime;
    const [prevTime, prevFrames, prevFps] = prev;
    const fps = Math.round((frames - prevFrames) / (time - prevTime) * 1000);

    console.log(fps, prevFps);
    if (fps === prevFps) {
        return fps;
    } else {
        return await calculateFramerate(video, [time, frames, fps]);
    }
}

const requestVideoFramePromise = (video) => new Promise((resolve) => {
    video.requestVideoFrameCallback((now, metadata) => {
        resolve(metadata);
    });
})