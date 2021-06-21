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
            const deltaX = event.movementX / 2;
            const deltaY = event.movementY / 2;
            const rotation = this.select.rotation * Math.PI / 180;

            if (this.handle instanceof RotationHandle) {
                console.log("ROTATION");
                const x = mouseX - this.select.x;
                const y = this.select.y - mouseY;
                let angle;

                if (x === 0) {
                    angle = y >= 0 ? 0 : 180;
                } else {
                    const update = 90 - Math.atan(y / x) * 180 / Math.PI;
                    angle = x > 0 ? update : update + 180;
                }
                this.select.setRotation(angle);

            } else {
                const w = deltaX * Math.cos(rotation) + deltaY * Math.sin(rotation);
                const h = deltaX * Math.sin(rotation) - deltaY * Math.cos(rotation);

                if (this.handle === "TL") {
                    console.log("TL");
                    this.select.setWidth(-w);
                    this.select.setHeight(h);
                } else if (this.handle === "TR") {
                    console.log("TR")
                    this.select.setWidth(w);
                    this.select.setHeight(h);
                } else if (this.handle === "BL") {
                    console.log("BL")
                    this.select.setWidth(-w);
                    this.select.setHeight(-h);
                } else if (this.handle === "BR") {
                    console.log("BR")
                    this.select.setWidth(w);
                    this.select.setHeight(-h);
                }
                this.select.setPosition(this.select.x + deltaX / 2, this.select.y + deltaY / 2);

            }

        } else if (this.select && this.mouseDown) {
            console.log("MOVE");
            this.select.setPosition(mouseX, mouseY, this.context);
        } else if (!this.select) {
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
                    if (handle === this.select.handleTL) {
                        this.handle = "TL";
                    } else if (handle === this.select.handleTR) {
                        this.handle = "TR";
                    } else if (handle === this.select.handleBL) {
                        this.handle = "BL";
                    } else if (handle === this.select.handleBR) {
                        this.handle = "BR";
                    } else {
                        this.handle = handle;
                    }
                    break;
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