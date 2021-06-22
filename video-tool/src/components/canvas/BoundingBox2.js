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
        this.transform = null;

        this.handles = null;
        this.rotationHandle = null;

        this.hit = false;

        this._initHandles();
    }

    draw(context) {
        this.setPath();
        context.fillStyle = 'purple';
        context.fill(this.path);
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
        path.moveTo(this.handles[0].x, this.handles[0].y);
        path.lineTo(this.handles[1].x, this.handles[1].y);
        path.lineTo(this.handles[2].x, this.handles[2].y);
        path.lineTo(this.handles[3].x, this.handles[3].y);
        path.closePath();

        this.path = path;
    }


    recalculate(x, y, xold, yold, child) {
        const rotation = -this._getRotationAsRad(this.rotation);
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const deltaX = x - xold;
        const deltaY = y - yold;

        const relX = (x * cos - y * sin) - (xold * cos - yold * sin)
        const relY = (x * sin + y * cos) - (xold * sin + yold * cos)

        console.log("Abs: ", x, y, xold, yold);
        console.log("Rel: ", relX, relY);

        this.x += deltaX / 2;
        this.y += deltaY / 2;

        if (child === this.handles[0]) {
            this.width -= relX
            this.height -= relY;
            const oX = Math.floor(-this.width / 2);
            const oY = Math.floor(-this.height / 2);
            // this._setHandle(this.handles[0], oX, oY);
            this._setHandle(this.handles[1], oX + this.width, oY);
            this._setHandle(this.handles[3], oX, oY + this.height);
            // this._setHandle(this.handles[2], oX + this.width, oY + this.height);
        } else if (child === this.handles[1]) {
            this.width += relX
            this.height -= relY;
            const oX = Math.floor(-this.width / 2);
            const oY = Math.floor(-this.height / 2);
            this._setHandle(this.handles[0], oX, oY);
            //this._setHandle(this.handles[1], oX + this.width, oY);
            //   this._setHandle(this.handles[3], oX, oY + this.height);
            this._setHandle(this.handles[2], oX + this.width, oY + this.height);
        } else if (child === this.handles[2]) {
            this.width += relX
            this.height += relY;
            const oX = Math.floor(-this.width / 2);
            const oY = Math.floor(-this.height / 2);
            //this._setHandle(this.handles[0], oX, oY);
            this._setHandle(this.handles[1], oX + this.width, oY);
            this._setHandle(this.handles[3], oX, oY + this.height);
            //  this._setHandle(this.handles[2], oX + this.width, oY + this.height);
        } else {
            this.width -= relX
            this.height += relY;
            const oX = Math.floor(-this.width / 2);
            const oY = Math.floor(-this.height / 2);
            this._setHandle(this.handles[0], oX, oY);
            //this._setHandle(this.handles[1], oX + this.width, oY);
            // this._setHandle(this.handles[3], oX, oY + this.height);
            this._setHandle(this.handles[2], oX + this.width, oY + this.height);
        }

        this.setPath();

    }

    _setHandle(handle, relX, relY) {
        const rotation = this._getRotationAsRad(this.rotation);
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const x = relX * cos - relY * sin + this.x;
        const y = relX * sin + relY * cos + this.y;

        handle.setPosition(x, y);
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
        const rotation = this._getRotationAsRad(this.rotation);
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const x = relX * cos - relY * sin + this.x;
        const y = relX * sin + relY * cos + this.y;

        return new Handle(x, y, this);
    }



    _getRotationAsRad(rotation) {
        return rotation * Math.PI / 180;
    }
}