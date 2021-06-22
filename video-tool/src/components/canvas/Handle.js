
// x and y coordinates are defined relative to parent. Transforms
// must be applied to context in parent
class Handle {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;

        this.parent = parent;

        this.HANDLE_RADIUS = 10;

        this.path = null;
        this._setPath();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setPath();
    }

    setPositionHandleDirect(x, y) {
        const xold = this.x;
        const yold = this.y;

        this.x = x;
        this.y = y;
        this._setPath();
        this.parent.recalculate(x, y, xold, yold, this);
    }

    hitTest(hitX, hitY, context) {
        return context.isPointInPath(this.path, hitX, hitY);
    }

    draw(context) {
        context.fill(this.path);
    }

    _setPath() {
        const path = new Path2D();
        path.moveTo(this.x, this.y);
        path.arc(this.x, this.y, this.HANDLE_RADIUS, 0, Math.PI * 2);
        this.path = path;
    }
}

export default Handle;