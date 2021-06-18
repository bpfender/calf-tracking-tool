import Handle from "./Handle";

class RotationHandle extends Handle {
    static ROTATION_HANDLE_LENGTH = 50;

    constructor(h) {
        super(0, -Math.floor(h / 2) - RotationHandle.ROTATION_HANDLE_LENGTH);
    }

    draw(context) {
        context.fill(this.path);
        context.stroke(this._getLinePath());
    }

    _getLinePath() {
        const path = new Path2D();
        path.moveTo(0, this.y);
        path.lineTo(0, this.y + RotationHandle.ROTATION_HANDLE_LENGTH);
        return path;
    }

}
export default RotationHandle;