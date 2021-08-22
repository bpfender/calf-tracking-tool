import { LabelFactory } from "../annotations/LabelFactory";
import RotationHandle from "./RotationHandle";

// FIXME mouseover order isn't quite right yet
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

        return this.selected ? this.selected.key : null;
    }

    handleMouseUp() {
        this.mouseDown = false;
        this.handle = null;

        if (this.updateFlag) {
            const [canvasW, canvasH] = this._getCanvasDimensions();

            this.updateFlag = false;
            const x = Math.round(this.selected.x) / canvasW;
            const y = Math.round(this.selected.y) / canvasH;
            const w = Math.round(this.selected.width) / canvasW;
            const h = Math.round(this.selected.height) / canvasH;
            const rotation = Math.round(this.selected.rotation);

            return {
                label: LabelFactory(x, y, w, h, rotation),
                key: this.selected.key
            }
        }

        return null;
    }

    _hitTestBox(mouseX, mouseY) {
        for (const element of this.BBoxes) {
            if (element.hitTest(mouseX, mouseY, this.context)) {
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
                return handle;
            }
        }
        return null;
    }

    _redraw() {
        this._clear();
        this.BBoxes.forEach(element => {
            element.draw(this.context);
        });
    }

    _clear() {
        const [w, h] = this._getCanvasDimensions();

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, w, h);
    }

    _getCanvasDimensions() {
        return [this.context.canvas.width, this.context.canvas.height];
    }
}

export default Scene;