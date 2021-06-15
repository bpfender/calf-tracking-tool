import BoundingBox from "./bounding-box";

class Model {
    constructor(BBoxArray, Context) {
        this.BBoxArray = BBoxArray;
        this.Context = Context;

        this.hitTest = null;
    }

    addBBox() {
        this.BBoxArray.push(new BoundingBox());
    }

    deleteBBox(BBox) {
        const index = this.BBoxArray.indexOf(BBox);
        if (index > -1) {
            this.BBoxArray.splice(index, 1);
        }
    }

    hitTestView(x, y) {
        let check;

        if (this.hitTest) {
            check.push(this.hitTest);
        } else {
            check = [...this.BBoxArray];
        }

        for (const element of check) {
            if (element.hitTestBox(x, y, this.Context) ||
                element.hitTestHandles(x, y, this.Context)) {
                this.hitTest = element;
                return;
            }
        }
        this.hitTest = null;
    }

}

export default Model;