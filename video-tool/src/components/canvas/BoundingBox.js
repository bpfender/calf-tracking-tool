import Handle from "./Handle";
import RotationHandle from "./RotationHandle";

class BoundingBox {
    constructor(x, y, w, h, rotation, colour) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.colour = colour;

        this.width = w;
        this.height = h;

        this.path = null;
        this.transform = null;

        this.handleTL = null;
        this.handleTR = null;
        this.handleBL = null;
        this.handleBR = null;
        this.handleRot = null;

        this.hit = false;
        this.mouseover = false;
        this.select = false;

        this._setTransform();
        this._setPaths();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this._setTransform();
    }

    setRotation(rotation) {
        this.rotation = rotation;
        this._setTransform();
    }

    setWidth(w) {
        this.width += w;
        this._setPaths();
    }

    setHeight(h) {
        this.height += h;
        this._setPaths();
    }

    setMouseover(bool) {
        this.mouseover = bool;
    }

    setSelect(bool) {
        this.select = bool;
    }

    setLocalTransform(context) {
        context.setTransform(this.transform);
    }

    hitTest(hitX, hitY, context) {
        context.setTransform(this.transform);
        this.hit = context.isPointInPath(this.path, hitX, hitY)
    }

    draw(context) {
        this._drawBox(context);
        if (this.hit) {
            this._drawHandles(context);
        }
    }

    _drawBox(context) {
        context.setTransform(this.transform);
        context.stroke(this.path);
    }

    _drawHandles(context) {
        this.handleTL.draw(context);
        this.handleTR.draw(context);
        this.handleBL.draw(context);
        this.handleBR.draw(context);
        this.handleRot.draw(context);
    }

    _setPaths() {
        this._setBox();
        this._setHandles();
    }

    // TODO not happy about repetition of x,y calc
    _setBox() {
        const x = Math.floor(-this.width / 2);
        const y = Math.floor(-this.height / 2);

        const path = new Path2D();
        path.rect(x, y, this.width, this.height);
        this.path = path;
    }

    _setHandles() {
        const x = Math.floor(-this.width / 2);
        const y = Math.floor(-this.height / 2);

        this.handleTL = new Handle(x, y);
        this.handleTR = new Handle(x + this.width, y);
        this.handleBL = new Handle(x, y + this.height);
        this.handleBR = new Handle(x + this.width, y + this.height);
        this.handleRot = new RotationHandle(this.height);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix
    _setTransform() {
        const rotation = this.rotation * Math.PI / 180
        const x = Math.cos(rotation);
        const y = Math.sin(rotation);
        this.transform = new DOMMatrix([x, y, -y, x, this.x, this.y]);
    }
}

export default BoundingBox;