export const colourPalette = [
    "#48AFF0", "#3DCC91", "#FFB366",
    "#FF7373", "#FF6E4A", "#FF66A1",
    "#C274C2", "#AD99FF", "#669EFF",
    "#2EE6D6", "#62D96B", "#FFC940"]

function* colourGenerator(colours) {
    // FIXME this is duplicated for colour palette
    let i = 0;

    while (true) {
        yield colours[i]
        i = (i + 1) % colours.length;
    }
}

export const colourGen = colourGenerator(colourPalette);

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