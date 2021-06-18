import RotationHandle from "./RotationHandle";

class Scene {
    constructor(context, BBox) {
        this.context = context;
        this.BBox = BBox;

        this.select = null;
        this.handle = null;

        this.mouseDown = false;
        this._redraw();
    }

    handleMouseMove(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY


        if (this.handle) {
            console.log("HANDLE MOVE");
            if (this.handle instanceof RotationHandle) {
                console.log("ROTATION");
                this.select.setRotation(event.movementX)
            } else {
                this.select.setWidth(event.movementX);
                this.select.setHeight(event.movementY);
            }

        }
        else if (this.select && this.mouseDown) {
            console.log("MOVE");
            this.select.setPosition(mouseX, mouseY, this.context);
        }
        else if (!this.select) {
            this.BBox.hitTest(mouseX, mouseY, this.context);
        }

        this._redraw();
    }

    handleMouseDown(mouseX, mouseY) {
        this.mouseDown = true;

        if (this.select) {
            this.select.setLocalTransform(this.context);
            const handles = [
                this.BBox.handleTL,
                this.BBox.handleTR,
                this.BBox.handleBL,
                this.BBox.handleBR,
                this.BBox.handleRot];

            for (const handle of handles) {
                if (handle.hitTest(mouseX, mouseY, this.context)) {
                    console.log("HANDLE");
                    this.handle = handle;
                }
            }

        }

        else {
            this.BBox.hitTest(mouseX, mouseY, this.context);
            if (this.BBox.hit) {
                this.select = this.BBox;
            } else {
                this.select = null;
            }
        }

        this._redraw();
    }

    handleMouseUp() {
        this.mouseDown = false;
        this.handle = null;
    }

    _redraw() {
        this._clear();
        this.BBox.draw(this.context);
    }

    _clear() {
        const w = this.context.canvas.width;
        const h = this.context.canvas.height;

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, w, h);
    }
}

export default Scene;