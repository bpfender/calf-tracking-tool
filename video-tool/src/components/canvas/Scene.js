class Scene {
    constructor(context, BBox) {
        this.context = context;
        this.BBox = BBox;
        this.select = null;

        this.mouseDown = false;
    }

    handleMouseMove(mouseX, mouseY) {
        if (this.select && this.mouseDown) {
            console.log("MOVE");
            this.BBox.setPosition(mouseX, mouseY, this.context);
        }
        else if (!this.select) {
            this.BBox.hitTest(mouseX, mouseY, this.context);

        }

        this.redraw();
    }

    handleMouseDown(mouseX, mouseY) {
        this.mouseDown = true;
        this.BBox.hitTest(mouseX, mouseY, this.context);
        if (this.BBox.hit) {
            this.select = this.BBox;
        } else {
            this.select = null;
        }

        this.redraw();
    }

    handleMouseUp() {
        this.mouseDown = false;
    }




    redraw() {
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