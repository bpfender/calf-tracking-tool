
// x and y coordinates are defined relative to parent. Transforms
// must be applied to context in parent
class Handle {
    constructor(x, y, observer) {
        this.x = x;
        this.y = y;

        this.observer = observer;

        this.HANDLE_RADIUS = 10;

        this.path = null;
        this._setPath();
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this._setPath();
    }

    setPosition(x, y) {
        const xold = this.x;
        const yold = this.y;

        this.x = x;
        this.y = y;
        this._setPath();
        this.observer.recalculate(x, y, xold, yold, this);
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