// TODO this is very rudimentary currently. Will need to be integrated into setup routine
function calculateFPS(now) {
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
};

export { calculateFPS };