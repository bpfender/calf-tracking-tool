// TODO this is very rudimentary currently. Will need to be integrated into setup routine
export function calculateFPS(now) {
    if (typeof calculateFPS.start_time === 'undefined') {
        calculateFPS.start_time = 0.0;
        calculateFPS.count = 0;
    }

    if (calculateFPS.start_time === 0.0) {
        calculateFPS.start_time = now;
    }

    let elapsed = (now - calculateFPS.start_time) / 1000.0;
    let fps = ++calculateFPS.count / elapsed;

    if (calculateFPS.count > 40) {
        calculateFPS.start_time = 0.0;
        calculateFPS.count = 0;
        console.log((fps));
    }
};

export function calcFPS2(metadata) {
    if (typeof calcFPS2.count === 'undefined' ||
        calcFPS2.count > 10) {
        calcFPS2.count = 0;
        calcFPS2.time = metadata.mediaTime;
    }

    const fps = calcFPS2.count++ / (metadata.mediaTime - calcFPS2.time);
    console.log(fps);
}
