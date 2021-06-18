class Context {
    constructor(context) {
        this.context = context;
    }

    stroke(Path) {
        this.context.stroke(Path);
    }

    fill(Path) {
        this.context.fill(Path);
    }

    setContextTransform(originX, originY, rotation) {
        const x = Math.cos(rotation);
        const y = Math.sin(rotation);

        this.context.setTransform(x, y, -y, x, originX, originY);
    }

    isPointInPath(Path, x, y) {
        return this.context.isPointInPath(Path, x, y);
    }

    setStrokeStyle(colour) {
        this.context.strokeStyle = colour;
    }

    setFillStyle(colour) {
        this.context.fillStyle = colour;
    }

    clearContext() {
        const width = this.context.canvas.width;
        const height = this.context.canvas.height;

        this.resetContext();
        this.context.clearRect(0, 0, width, height);
    }

    resetContext() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export default Context;