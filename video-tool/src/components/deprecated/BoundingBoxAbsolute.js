import Handle from "./Handle";
import RotationHandle from "./RotationHandle";

// This can probably be rewritten to allow for direct actuation of handles with
// relative definitions. Consider for future work

class BoundingBox {
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

    _setPath() {
        const path = new Path2D();

        this.handles.forEach(element => {
            path.lineTo(element.x, element.y);
        });
        path.closePath();

        this.path = path;
    }

    _updateOnHandleMove(deltaX, deltaY, child) {
        //const sin = Math.sin(-this._getRotationAsRad() % Math.PI);
        //const cos = Math.cos(-this._getRotationAsRad() % Math.PI);
        //const deltaW = deltaX * cos - deltaY * sin;
        //const deltaH = deltaX * sin + deltaY * cos;
        //this._setTransformMatrix();

        const rotation = -this._getRotationAsRad() % (Math.PI);
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);

        const deltaW = (deltaX * cos - deltaY * sin);
        const deltaH = (deltaX * sin + deltaY * cos);

        // Update x,y coordinates of bounding box first
        this.x += deltaX / 2;
        this.y += deltaY / 2;

        child.updatePosition(deltaX, deltaY);
        // Update position of handles depending on which one gets moved, relative to updated x,
        // y coordinates of bounding box
        if (child === this.handles[0]) {
            this.width -= deltaW
            this.height -= deltaH;
            this._setHandles([1, 3]);
        } else if (child === this.handles[1]) {
            this.width += deltaW
            this.height -= deltaH;
            this._setHandles([0, 2]);
        } else if (child === this.handles[2]) {
            this.width += deltaW
            this.height += deltaH;
            this._setHandles([1, 3]);
        } else if (child === this.handles[3]) {
            this.width -= deltaW
            this.height += deltaH;
            this._setHandles([0, 2]);
        }
    }

    // Either updates all handles for rotation or position change, or updates relevant handles
    // for resize
    _setHandles(indices) {
        const { x, y } = this._getRelativeCoordinates();

        const TL = () => { this._setHandle(this.handles[0], x, y) };
        const TR = () => { this._setHandle(this.handles[1], x + this.width, y) };
        const BR = () => { this._setHandle(this.handles[2], x + this.width, y + this.height) };
        const BL = () => { this._setHandle(this.handles[3], x, y + this.height) };
        const setHandles = [TL, TR, BR, BL];

        if (!indices) {
            setHandles.forEach(element => {
                element();
            })
        } else {
            indices.forEach(element => {
                setHandles[element]();
            });
        }

        this._setPath();
    }

    _setHandle(handle, relX, relY) {
        const { x, y } = this._calculateXYAbsolute(relX, relY);
        handle.setPosition(x, y);
    }

    _initHandles() {
        const { x, y } = this._getRelativeCoordinates();
        const TL = this._initHandle(x, y);
        const TR = this._initHandle(x + this.width, y);
        const BL = this._initHandle(x, y + this.height);
        const BR = this._initHandle(x + this.width, y + this.height);

        this.handles = [TL, TR, BR, BL];
        this._setPath();
    }

    _initHandle(relX, relY) {
        const { x, y } = this._calculateXYAbsolute(relX, relY);
        return new Handle(x, y, this._updateOnHandleMove.bind(this));
    }

    _calculateXYAbsolute(relX, relY) {
        const { sin, cos } = this._getSinCos();

        const x = relX * cos - relY * sin + this.x;
        const y = relX * sin + relY * cos + this.y;
        return { x: x, y: y };
    }

    _getRelativeCoordinates() {
        return {
            x: - this.width / 2,
            y: - this.height / 2
        };
    }

    _getSinCos() {
        const rotation = this._getRotationAsRad();
        return {
            sin: Math.sin(rotation),
            cos: Math.cos(rotation)
        };
    }

    _getRotationAsRad() {
        return this.rotation * Math.PI / 180;
    }

}

export default BoundingBox;