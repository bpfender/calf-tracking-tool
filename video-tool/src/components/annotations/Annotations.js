import AnnotationTrack from "./AnnotationTrack";

function FrameAnnotation(x, y, width, height, rotation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.labelled = false;
}

class Annotations {
    constructor() {
        this.annotations = new Map();
    }

    addId(id) {
        this.annotations.set(id, new AnnotationTrack());
    }

    deleteId(id) {
        if (!this.annotations.delete(id)) {
            throw new Error("Id" + id + "does not exist");
        }
    }

    getId(id) {
        const track = this.annotations.get(id);
        if (track === undefined) {
            throw new Error("Id" + id + "does not exist");
        }
    }

    getAnnotationIds() {
        return [...this.annotations.keys()];
    }

    getFrameAnnotations(frame) {
        const annotationList = [];
        this.annotations.forEach(id => {
            annotationList.push(id.getAnnotation(frame));
        })

        return annotationList;
    }

    addFrameAnnotation(id, frame, annotation) {
        const track = this.getId(id);
        track.setAnnotation(frame, annotation)
    }
}

export default Annotations;