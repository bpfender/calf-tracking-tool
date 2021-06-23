import Handle from "./Handle";
import RotationHandle from "./RotationHandle";

export class BB2 {
    constructor(x, y, w, h, rotation) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.width = w;
        this.height = h;

        this.path = null;
        this.handles = null;
        this.rotationHandle = null;

        this.transform = null;

        this.hit = false;

        this._initHandles();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setHandles();
    }

    setRotation(rotation) {
        this.rotation = rotation;
        this._setHandles();
    }

    setWidth(w) {
        this.width = w;
        this._setHandles();
    }

    setHeight(h) {
        this.height = h;
        this._setHandles();
    }

    hitTest(hitX, hitY, context) {
        return context.isPointInPath(this.path, hitX, hitY);
    }

    draw(context) {
        console.log("BOX: x: ", this.x, "y: ", this.y, "h: ", this.height, "rot: ", this.rotation);
        // Ensure paths are up to date
        this.setPath();
        context.fillStyle = 'purple';
        //  context.fill(this.path);
        context.stroke(this.path);

        context.fillStyle = 'red'
        this.handles[0].draw(context);
        context.fillStyle = 'blue'
        this.handles[1].draw(context);
        context.fillStyle = 'green'
        this.handles[2].draw(context);
        context.fillStyle = 'yellow'
        this.handles[3].draw(context);
    }

    setPath() {
        const path = new Path2D();

        this.handles.forEach(element => {
            path.lineTo(element.x, element.y);
        });
        path.closePath();

        this.path = path;
    }

    recalculate(x, y, xold, yold, child) {
        const rotation = -this._getRotationAsRad(this.rotation);
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const deltaX = x - xold;
        const deltaY = y - yold;

        const relX = Math.round((x * cos - y * sin) - (xold * cos - yold * sin));
        const relY = Math.round((x * sin + y * cos) - (xold * sin + yold * cos));

        console.log("Abs: ", x, y, xold, yold);
        console.log("Rel: ", relX, relY);

        this.x += deltaX / 2;
        this.y += deltaY / 2;

        if (child === this.handles[0]) {
            this.width -= relX
            this.height -= relY;
        } else if (child === this.handles[1]) {
            this.width += relX
            this.height -= relY;
        } else if (child === this.handles[2]) {
            this.width += relX
            this.height += relY;
        } else {
            this.width -= relX
            this.height += relY;
        }

        this._setHandles(Math.floor(-this.width), Math.floor(-this.height));
        this.setPath();
    }

    _setHandle(handle, relX, relY) {
        const { x, y } = this._calculateXYAbsolute(relX, relY);

        handle.setPosition(x, y);
    }

    _setHandles() {
        const x = Math.floor(-this.width / 2);
        const y = Math.floor(-this.height / 2);
        this._setHandle(this.handles[0], x, y);
        this._setHandle(this.handles[1], x + this.width, y);
        this._setHandle(this.handles[2], x + this.width, y + this.height);
        this._setHandle(this.handles[3], x, y + this.height);
    }


    _initHandles() {
        const x = Math.floor(-this.width / 2);
        const y = Math.floor(-this.height / 2);

        const TL = this._initHandle(x, y);
        const TR = this._initHandle(x + this.width, y);
        const BL = this._initHandle(x, y + this.height);
        const BR = this._initHandle(x + this.width, y + this.height);

        this.handles = [TL, TR, BR, BL];
    }

    _initHandle(relX, relY) {
        const { x, y } = this._calculateXYAbsolute(relX, relY);

        return new Handle(x, y, this.recalculate.bind(this));
    }

    _calculateXYAbsolute(relX, relY) {
        const rotation = this._getRotationAsRad(this.rotation);
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const x = Math.round(relX * cos - relY * sin + this.x);
        const y = Math.round(relX * sin + relY * cos + this.y);
        console.log("x: ", x, "y: ", y);

        return { x: x, y: y };
    }

    _setTransform() {
        const rotation = this._getRotationAsRad();
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        this.transform = new DOMMatrix([cos, sin, -sin, cos, this.x, this.y]);
    }

    _getRotationAsRad() {
        return this.rotation * Math.PI / 180;
    }
}