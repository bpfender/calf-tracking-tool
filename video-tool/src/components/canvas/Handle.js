
// x and y coordinates are defined relative to parent. Transforms
// must be applied to context in parent
class Handle {
    constructor(x, y, recalculateCallback) {
        this.x = x;
        this.y = y;

        this.recalculateCallback = recalculateCallback;

        this.HANDLE_RADIUS = 10;

        this.path = null;
        this._setPath();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setPath();
    }

    moveHandle(movementX, movementY) {
        const xold = this.x;
        const yold = this.y;

        this.setPosition(xold + movementX, yold + movementY);

        this.recalculateCallback(xold + movementX, yold + movementY, xold, yold, this);
    }

    hitTest(hitX, hitY, context) {
        // QUESTION, should i set transform of parent here?
        return context.isPointInPath(this.path, hitX, hitY);
    }

    draw(context) {
        context.fill(this.path);
    }

    _setPath() {
        const path = new Path2D();
        const x = Math.round(this.x);
        const y = Math.round(this.y);


        path.moveTo(x, y);
        path.arc(x, y, this.HANDLE_RADIUS, 0, Math.PI * 2);
        this.path = path;
    }
}

export default Handle;