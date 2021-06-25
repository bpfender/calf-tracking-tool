
class Handle {
    constructor(x, y, handleMoveCallback) {
        this.x = x;
        this.y = y;

        this.handleMoveCallback = handleMoveCallback;

        this.HANDLE_RADIUS = 10;

        this.path = null;
        this._setPath();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setPath();
    }

    updatePosition(deltaX, deltaY) {
        this.setPosition(this.x + deltaX, this.y + deltaY);
    }

    moveHandle(deltaX, deltaY) {
        const xold = this.x;
        const yold = this.y;
        const x = this.x + deltaX;
        const y = this.y + deltaY;
        console.log(deltaX, deltaY);

        this.handleMoveCallback(xold, yold, x, y, this);

        //this.parent._updateOnHandleMove(deltaX, deltaY, this);
    }

    hitTest(hitX, hitY, context) {
        //this.parent._setContextTransform(context);
        return context.isPointInPath(this.path, hitX, hitY);
    }

    draw(context) {
        context.fill(this.path);
    }

    _setPath() {
        const path = new Path2D();

        // Round position to avoid sub-pixel drawing
        const x = Math.round(this.x);
        const y = Math.round(this.y);

        path.moveTo(x, y);
        path.arc(x, y, this.HANDLE_RADIUS, 0, Math.PI * 2);
        this.path = path;
    }
}

export default Handle;