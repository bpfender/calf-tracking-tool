import Handle from "./Handle";

class RotationHandle extends Handle {
    static ROTATION_HANDLE_LENGTH = 50;

    constructor(h) {
        super(0, -Math.floor(h / 2) - RotationHandle.ROTATION_HANDLE_LENGTH);

        this.linePath = null;
        this._setLinePath()
    }

    setPosition(h) {
        super.setPosition(0, -Math.floor(h / 2) - RotationHandle.ROTATION_HANDLE_LENGTH);
    }

    draw(context) {
        super.draw(context);
        context.stroke(this.linePath);
    }

    _setPath() {
        super._setPath();
        this._setLinePath();
    }

    _setLinePath() {
        const path = new Path2D();
        path.moveTo(0, this.y);
        path.lineTo(0, this.y + RotationHandle.ROTATION_HANDLE_LENGTH);
        this.linePath = path;
    }

}

export default RotationHandle;