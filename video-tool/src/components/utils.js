export function framerateCallback(metadata, video, prev = [0, 0, 0]) {
    const frames = metadata.presentedFrames;
    const time = metadata.mediaTime;
    const [prevTime, prevFrames, prevFps] = prev;

    const fps = Math.round((frames - prevFrames) / (time - prevTime) * 1000);
    console.log(fps, prevFps, frames, prevFrames, time, prevTime);

    if (fps === prevFps) {
        video.pause();
        console.log("DISPATCH", fps);
    } else {
        video.requestVideoFrameCallback((now, metadata) => {
            framerateCallback(metadata, video, [time, frames, fps])
        })
    }
}