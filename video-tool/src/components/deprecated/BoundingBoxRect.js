import Handle from "../canvas/Handle";
import RotationHandle from "../canvas/RotationHandle";

class BoundingBox {
    constructor(x, y, w, h, rotation, colour) {
        // Coordinates are defined as centre of rectangle from top-left
        // Rotation is clockwise
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.rotation = rotation;

        this.path = null;
        this.handles = null;

        this.transform = null;

        this.hit = false;

        this._setTransformMatrix();
        this._setPaths();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setTransformMatrix();
    }

    setRotation(rotation) {
        this.rotation = rotation;
        this._setTransformMatrix();
    }

    setWidth(w) {
        this.width = w;
        this._setPaths();
    }

    setHeight(h) {
        this.height = h;
        this._setPaths();
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
        context.setTransform(this.transform);
        return this.hit = context.isPointInPath(this.path, hitX, hitY);
    }

    draw(context) {
        // console.log("x: ", this.x, "y: ", this.y, "h: ", this.height, "w: ", this.width, "rot: ", this.rotation);
        context.setTransform(this.transform);
        this._drawBox(context);
        if (this.hit) {
            this._drawHandles(context);
        }
    }

    _drawBox(context) {
        context.stroke(this.path);
    }

    _drawHandles(context) {
        this.handles.forEach(handle => {
            handle.draw(context);
        });
    }

    // Paths are currently defined relative to origin of BBOX
    _setPaths() {
        const { x, y } = this._getDrawingOrigin();
        this._setBox(x, y);
        this._setHandles(x, y);
    }

    _setBox(x, y) {
        this.path = new Path2D();
        this.path.rect(x, y, this.width, this.height);
    }

    _setHandles(x, y) {
        if (this.handles) {
            this.handles.get("TL").setPosition(x, y);
            this.handles.get("TR").setPosition(x + this.width, y);
            this.handles.get("BL").setPosition(x, y + this.height);
            this.handles.get("BR").setPosition(x + this.width, y + this.height);
            this.handles.get("Rot").setPosition(this.height);
        } else {
            this.handles = new Map([
                ["TL", new Handle(x, y)],
                ["TR", new Handle(x + this.width, y)],
                ["BL", new Handle(x, y + this.height)],
                ["BR", new Handle(x + this.width, y + this.height)],
                ["Rot", new RotationHandle(this.height)]
            ]);
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix
    _setTransformMatrix() {
        const rotation = this._getRotationAsRad();
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        this.transform = new DOMMatrix([cos, sin, -sin, cos, this.x, this.y]);
    }

    _getRotationAsRad() {
        return this.rotation * Math.PI / 180;
    }

    _getDrawingOrigin() {
        return {
            x: -this.width / 2,
            y: -this.height / 2
        };
    }
}

export default BoundingBox;