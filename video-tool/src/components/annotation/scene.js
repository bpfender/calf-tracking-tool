class Scene {
    constructor(BBoxArray, Context) {
        this.BBoxArray = BBoxArray;
        this.Context = Context;
    }

    redrawScene() {
        this.Context.clearContext()
        this.drawAll();
    }

    drawAll() {
        this.BBoxArray.forEach(element => {
            element.draw(this.Context);
        })
    }
}

export default Scene;