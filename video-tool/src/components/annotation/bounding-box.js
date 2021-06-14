class BoundingBox {
    static HANDLE_RADIUS = 5;
    static ROTATION_HANDLE_LENGTH = 20;

    constructor(w, h, x, y, rotation, colour) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.colour = colour;
        this.mouseover = false;
        this.select = false;
    }

    draw(Context) {
        this.drawBox(Context);
        this.drawHandles(Context);
    }


    drawBox(Context) {
        Context.setContextTransform(this.x, this.y, this.rotation);

        if (this.mouseover) {
            Context.setContextStyle('purple');
        } else {
            Context.setContextStyle(this.colour);
        }

        Context.stroke(this.getBoxPath());
    }

    drawHandles(Context) {
        if (this.select) {
            const path = this.getHandlesPath();

            Context.setContextTransform(this.x, this.y, this.rotation);
            Context.setContextStyle('green');
            Context.fill(path);
            Context.setContextStyle('colour');
            Context.stroke(path);
        }
    }


    getBoxPath() {
        const x = Math.floor(-this.width / 2);
        const y = Math.floor(-this.height / 2);
        const w = this.width;
        const h = this.height;

        const path = new Path2D();
        path.rect(x, y, w, h);
        return path;
    }

    getHandlesPath() {
        const x = Math.floor(-this.width / 2);
        const y = Math.floor(-this.height / 2);
        const w = this.width;
        const h = this.height;

        // TODO not happy with these functions 
        const setCirclePath = (x, y) => {
            path.moveTo(x, y);
            path.arc(x, y, BoundingBox.HANDLE_RADIUS, 0, Math.PI * 2);
        }

        const setRotationPath = () => {
            path.moveTo(0, y);
            path.lineTo(0, y - BoundingBox.ROTATION_HANDLE_LENGTH);
            setCirclePath(0, y - BoundingBox.ROTATION_HANDLE_LENGTH);
        }

        const path = new Path2D();
        setCirclePath(x, y);
        setCirclePath(x + w, y);
        setCirclePath(x, y + h);
        setCirclePath(x + w, y + h);
        setRotationPath();
        return path;
    }

    updatePostion(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
    }

    updateWidth(deltaWidth) {
        this.width += deltaWidth;
    }

    updateHeight(deltaHeight) {
        this.height += deltaHeight;
    }

    updateRotation(deltaRotation) {
        this.rotation += deltaRotation;
    }

    setColour(colour) {
        this.colour = colour;
    }

    setMouseover(bool) {
        this.mouseover = bool;
    }

    setSelect(bool) {
        this.select = bool;
    }
}

export default BoundingBox;