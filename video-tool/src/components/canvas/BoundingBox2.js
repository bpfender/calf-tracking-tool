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

    updatePosition(deltaX, deltaY) {
        this.setPosition(this.x + deltaX, this.y + deltaY);
    }

    updateRotation(deltaRotation) {
        this.setRotation(this.rotation + deltaRotation);
    }

    updateWidth(deltaW) {
        this.setWidth(this.width + deltaW);
    }

    updateHeight(deltaH) {
        this.setHeight(this.height + deltaH);
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

        const relX = (x * cos - y * sin) - (xold * cos - yold * sin);
        const relY = (x * sin + y * cos) - (xold * sin + yold * cos);

        console.log("Abs: ", x, y, xold, yold);
        console.log("Rel: ", relX, relY);

        this.x += deltaX / 2;
        this.y += deltaY / 2;

        if (child === this.handles[0]) {
            this.width -= relX
            this.height -= relY;
            this._setChosenHandles(1, 3);
        } else if (child === this.handles[1]) {
            this.width += relX
            this.height -= relY;
            this._setChosenHandles(2, 0);
        } else if (child === this.handles[2]) {
            this.width += relX
            this.height += relY;
            this._setChosenHandles(3, 1);
        } else {
            this.width -= relX
            this.height += relY;
            this._setChosenHandles(0, 2);
        }

        this.setPath();
    }

    _setHandle(handle, relX, relY) {
        const { x, y } = this._calculateXYAbsolute(relX, relY);

        handle.setPosition(x, y);
    }

    _setChosenHandles(i, j) {
        const x = -this.width / 2;
        const y = -this.height / 2;

        if (i === 0 || j === 0) {
            this._setHandle(this.handles[0], x, y);
        }
        if (i === 1 || j === 1) {
            this._setHandle(this.handles[1], x + this.width, y);
        }
        if (i === 2 || j === 2) {
            this._setHandle(this.handles[2], x + this.width, y + this.height);
        }
        if (i === 3 || j === 3) {
            this._setHandle(this.handles[3], x, y + this.height);
        }
    }

    _setHandles() {
        const x = -this.width / 2;
        const y = -this.height / 2;
        this._setHandle(this.handles[0], x, y);
        this._setHandle(this.handles[1], x + this.width, y);
        this._setHandle(this.handles[2], x + this.width, y + this.height);
        this._setHandle(this.handles[3], x, y + this.height);
    }


    _initHandles() {
        const x = -this.width / 2;
        const y = -this.height / 2;

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

        const x = relX * cos - relY * sin + this.x;
        const y = relX * sin + relY * cos + this.y;
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