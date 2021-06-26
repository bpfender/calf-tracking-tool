import RotationHandle from "./RotationHandle";

class Scene {
    constructor(context, BBoxes) {
        this.context = context;
        this.BBoxes = BBoxes;

        this.selected = null;
        this.mouseover = null;
        this.handle = null;

        this.mouseDown = false;

        this.lastX = null;
        this.lastY = null;

        this._redraw();
    }

    handleMouseMove(mouseX, mouseY) {
        // movementX event does weird things for some reason.
        const deltaX = mouseX - this.lastX;
        const deltaY = mouseY - this.lastY;
        this.lastX = mouseX;
        this.lastY = mouseY;

        if (this.handle) {
            if (this.handle instanceof RotationHandle) {
                this._calculateRotation(mouseX, mouseY);
            } else {
                this.handle.moveHandle(deltaX, deltaY)
            }
        } else if (this.selected && this.mouseDown) {
            this.selected.updatePosition(deltaX, deltaY);
        }

        this._redraw();
    }

    handleMouseDown(mouseX, mouseY) {
        this.mouseDown = true;
        this.lastX = mouseX;
        this.lastY = mouseY;

        if (this.selected) {
            this.handle = this._hitTestHandles(mouseX, mouseY);
        }

        if (!this.selected || !this.handle) {
            this.selected = this._hitTestBox(mouseX, mouseY);
        }
        // TODO this redraw is superfluous sometimes
        this._redraw();
    }

    handleMouseUp() {
        this.mouseDown = false;
        this.handle = null;
    }

    _hitTestBox(mouseX, mouseY) {
        for (const element of this.BBoxes) {
            if (element.hitTest(mouseX, mouseY, this.context)) {
                console.log("BOX HIT");
                return element;
            }
        }
        return null;
    }

    _hitTestHandles(mouseX, mouseY) {
        const handles = this.selected.handles;

        // FIXME don't like setting transform here
        this.selected._setContextTransform(this.context);

        for (const handle of handles) {
            if (handle.hitTest(mouseX, mouseY, this.context)) {
                console.log("HANDLE HIT");
                return handle;
            }
        }

        return null;
    }

    _calculateRotation(mouseX, mouseY) {
        const x = mouseX - this.selected.x;
        const y = this.selected.y - mouseY;

        let angle;

        if (x === 0) {
            angle = y >= 0 ? 0 : 180;
        } else {
            angle = 90 - Math.atan(y / x) * 180 / Math.PI;
            angle = x > 0 ? angle : angle + 180;
        }

        // Make sure angle is set to whole number
        this.selected.setRotation(Math.round(angle));
    }

    _calculateResize(deltaX, deltaY) {
        const rotation = this.selected.rotation * Math.PI / 180;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const w = (deltaX * cos + deltaY * sin);
        const h = (deltaX * sin - deltaY * cos);

        if (this.handle === this.selected.handles.get('TL')) {
            this.selected.updateWidth(-w);
            this.selected.updateHeight(h);
        } else if (this.handle === this.selected.handles.get('TR')) {
            this.selected.updateWidth(w);
            this.selected.updateHeight(h);
        } else if (this.handle === this.selected.handles.get('BL')) {
            this.selected.updateWidth(-w);
            this.selected.updateHeight(-h);
        } else if (this.handle === this.selected.handles.get('BR')) {
            this.selected.updateWidth(w);
            this.selected.updateHeight(-h);
        }

        this.selected.updatePosition(deltaX / 2, deltaY / 2);
    }

    _redraw() {
        this._clear();
        this.BBoxes.forEach(element => {
            element.draw(this.context);
        });
    }

    _clear() {
        const w = this.context.canvas.width;
        const h = this.context.canvas.height;

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, w, h);
    }
}

export default Scene;