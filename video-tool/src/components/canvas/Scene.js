import RotationHandle from "./RotationHandle";

class Scene {
    constructor(context) {
        this.context = context;
        this.BBoxes = [];

        this.selected = null;
        this.mouseover = null;
        this.handle = null;

        this.mouseDown = false;
        this.updateFlag = false;

        this.lastX = null;
        this.lastY = null;
    }

    updateBoundingBoxes(BBoxes) {
        this.BBoxes = BBoxes;
        // FIXME not super sleek
        this.selected = this.BBoxes.find(elem => elem.selected === true);

        this._redraw();
    }

    handleMouseMove(mouseX, mouseY) {
        // movementX event does weird things for some reason.
        const deltaX = mouseX - this.lastX;
        const deltaY = mouseY - this.lastY;
        this.lastX = mouseX;
        this.lastY = mouseY;

        console.log(this.selected === this.BBoxes[2]);
        if (this.handle) {
            if (this.handle instanceof RotationHandle) {
                this.handle.moveHandle(
                    mouseX - this.selected.x,
                    this.selected.y - mouseY);
            } else {
                this.handle.moveHandle(deltaX, deltaY);
            }
            this.updateFlag = true;
        } else if (this.selected && this.mouseDown) {
            this.selected.updatePosition(deltaX, deltaY);
            this.updateFlag = true;
        }

        this._redraw();
    }

    handleMouseDown(mouseX, mouseY) {
        this.mouseDown = true;

        //FIXME probably not needed again here
        this.lastX = mouseX;
        this.lastY = mouseY;

        if (this.selected) {
            this.handle = this._hitTestHandles(mouseX, mouseY);
        }

        if (!this.selected || !this.handle) {
            this.selected = this._hitTestBox(mouseX, mouseY);
        }
        // TODO this redraw is superfluous sometimes
        //this._redraw();
        return this.selected ? this.selected.key : null;
    }

    handleMouseUp() {
        this.mouseDown = false;
        this.handle = null;

        if (this.updateFlag) {
            this.updateFlag = false;
            return {
                label: {
                    x: Math.round(this.selected.x),
                    y: Math.round(this.selected.y),
                    w: Math.round(this.selected.width),
                    h: Math.round(this.selected.height),
                    rotation: Math.round(this.selected.rotation),
                    labelled: true
                },
                key: this.selected.key
            }
        }

        return null;
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
        const handles = [...this.selected.handles, this.selected.rotationHandle];

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

    _redraw() {
        console.log("REDRAW");
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