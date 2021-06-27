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

        this._setTransformMatrix();
        this._initHandles();
    }

    setBoundingBox(x, y, w, h, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rotation = rotation;
        this._setHandles();
        this._setTransformMatrix();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setHandles();
        this._setTransformMatrix();
    }

    setRotation(rotation) {
        this.rotation = rotation;
        this._setHandles();
        this._setTransformMatrix();
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
        this._setContextTransform(context);
        return context.isPointInPath(this.path, hitX, hitY);
    }

    draw(context) {
        this._setContextTransform(context);

        context.stroke(this.path);

        context.fillStyle = 'red'
        this.handles[0].draw(context);
        context.fillStyle = 'blue'
        this.handles[1].draw(context);
        context.fillStyle = 'green'
        this.handles[2].draw(context);
        context.fillStyle = 'yellow'
        this.handles[3].draw(context);
        context.fillStyle = 'black';
        this.rotationHandle.draw(context);

    }

    _setPath() {
        const path = new Path2D();

        this.handles.forEach(element => {
            path.lineTo(element.x, element.y);
        });
        path.closePath();

        this.path = path;
    }

    _resizeOnHandleMove(deltaX, deltaY, child) {
        // TODO this is just opposite of getXYAbs()
        const rotation = -this._getRotationAsRad();
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);

        const deltaW = (deltaX * cos - deltaY * sin);
        const deltaH = (deltaX * sin + deltaY * cos);

        // Update x,y coordinates of bounding box first
        this.x += deltaX / 2;
        this.y += deltaY / 2;
        this._setTransformMatrix();

        // Update position of handles depending on which one gets moved, relative to updated x,
        // y coordinates of bounding box
        if (child === this.handles[0]) {
            this.width -= deltaW
            this.height -= deltaH;
        } else if (child === this.handles[1]) {
            this.width += deltaW
            this.height -= deltaH;
        } else if (child === this.handles[2]) {
            this.width += deltaW
            this.height += deltaH;
        } else if (child === this.handles[3]) {
            this.width -= deltaW
            this.height += deltaH;
        }

        this._setHandles();
    }

    _rotateOnHandleMove(deltaX, deltaY) {
        let angle;

        if (deltaX === 0) {
            angle = deltaY >= 0 ? 0 : 180;
        } else {
            angle = 90 - Math.atan(deltaY / deltaX) * 180 / Math.PI;
            angle = deltaX > 0 ? angle : angle + 180;
        }

        this.setRotation(Math.round(angle));
    }

    // Either updates all handles for rotation or position change, or updates relevant handles
    // for resize
    _setHandles(indices) {
        const { x, y } = this._getRelativeCoordinates();

        this._setHandle(this.handles[0], x, y);
        this._setHandle(this.handles[1], x + this.width, y);
        this._setHandle(this.handles[2], x + this.width, y + this.height);
        this._setHandle(this.handles[3], x, y + this.height);
        this._setHandle(this.rotationHandle, 0, y);

        this._setPath();
    }

    _setHandle(handle, relX, relY) {
        handle.setPosition(relX, relY);
    }

    _initHandles() {
        const { x, y } = this._getRelativeCoordinates();
        const TL = this._initHandle(x, y);
        const TR = this._initHandle(x + this.width, y);
        const BL = this._initHandle(x, y + this.height);
        const BR = this._initHandle(x + this.width, y + this.height);

        this.rotationHandle = this._initRotationHandle(0, y);

        this.handles = [TL, TR, BR, BL];
        this._setPath();
    }

    _initHandle(relX, relY) {
        return new Handle(relX, relY, this._resizeOnHandleMove.bind(this));
    }

    _initRotationHandle(relX, relY) {
        return new RotationHandle(relX, relY, this._rotateOnHandleMove.bind(this));
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

    _setTransformMatrix() {
        const rotation = this._getRotationAsRad();
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        this.transform = new DOMMatrix([cos, sin, -sin, cos, this.x, this.y]);
    }

    _setContextTransform(context) {
        context.setTransform(this.transform);
    }

}

export default BoundingBox;