import RotationHandle from "./RotationHandle";

class Scene {
    constructor(context, BBox) {
        this.context = context;
        this.BBoxes = [BBox];

        this.selected = null;
        this.mouseover = null;
        this.handle = null;
        this.hit = null;

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
            const rotation = this.selected.rotation * Math.PI / 180;

            if (this.handle instanceof RotationHandle) {
                console.log("ROTATION");
                const x = mouseX - this.selected.x;
                const y = this.selected.y - mouseY;
                let angle;

                if (x === 0) {
                    angle = y >= 0 ? 0 : 180;
                } else {
                    const update = 90 - Math.atan(y / x) * 180 / Math.PI;
                    angle = x > 0 ? update : update + 180;
                }
                this.selected.setRotation(angle);

            } else {
                const w = deltaX * Math.cos(rotation) + deltaY * Math.sin(rotation);
                const h = deltaX * Math.sin(rotation) - deltaY * Math.cos(rotation);

                if (this.handle === this.selected.handles.get('TL')) {
                    this.selected.setWidth(-w);
                    this.selected.setHeight(h);
                } else if (this.handle === this.selected.handles.get('TR')) {
                    this.selected.setWidth(w);
                    this.selected.setHeight(h);
                } else if (this.handle === this.selected.handles.get('BL')) {
                    this.selected.setWidth(-w);
                    this.selected.setHeight(-h);
                } else if (this.handle === this.selected.handles.get('BR')) {
                    this.selected.setWidth(w);
                    this.selected.setHeight(-h);
                }
                this.selected.setPosition(this.selected.x + deltaX / 2, this.selected.y + deltaY / 2);

            }

        } else if (this.selected && this.mouseDown) {
            console.log("MOVE");
            this.selected.setPosition(mouseX, mouseY, this.context);
        } else if (!this.selected) {
            this.mouseover = this._hitTestSelect(mouseX, mouseY);
        }

        this._redraw();
    }

    handleMouseDown(mouseX, mouseY) {
        this.mouseDown = true;

        if (this.selected) {
            this._hitTestHandles(mouseX, mouseY);
        }

        if (!this.selected || !this.handle) {
            this.selected = this._hitTestSelect(mouseX, mouseY);
        }

        this._redraw();
    }

    handleMouseUp() {
        this.mouseDown = false;
        this.handle = null;
    }

    _hitTestSelect(mouseX, mouseY) {
        for (const element of this.BBoxes) {
            if (element.hitTest(mouseX, mouseY, this.context)) {
                return element;
            }
        }
        return null;
    }

    _hitTestHandles(mouseX, mouseY) {
        this.context.setTransform(this.selected.transform);
        const handles = this.selected.handles;

        [...handles.values()].some(element => {
            if (element.hitTest(mouseX, mouseY, this.context)) {
                console.log("HANDLE");
                this.handle = element;
                return true;
            }
            return false;
        });
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