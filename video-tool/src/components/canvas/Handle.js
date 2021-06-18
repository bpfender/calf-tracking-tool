
// x and y coordinates are defined relative to parent. Transforms
// must be applied to context in parent
class Handle {
    constructor(relX, relY) {
        this.x = relX;
        this.y = relY;

        this.HANDLE_RADIUS = 5;

        this.path = null;
        this._setPath();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setPath();
    }

    hitTest(context) {
        return context.isPointInPath(this.path, this.x, this.y);
    }

    draw(context) {
        context.fill(this.path);
    }

    _setPath() {
        this.path = this._getPath();
    }

    _getPath() {
        const path = new Path2D();
        path.moveTo(this.x, this.y);
        path.arc(this.x, this.y, this.HANDLE_RADIUS, 0, Math.PI * 2);
        return path;
    }
}

export default Handle;