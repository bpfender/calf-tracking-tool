import LabelledFrames from "./LabelledFrames";

export default class AnnotationTrack {
    constructor(name, colour, totalFrames) {
        this.name = name;
        this.colour = colour;
        this.annotationTrack = new Array(totalFrames);
        this.labelledFrames = new LabelledFrames();
    }

    set setName(name) {
        this.name = name;
    }

    set setColour(colour) {
        this.colour = colour;
    }

    setAnnotation(frame, annotation) {
        this.annotationTrack[this.getIndex(frame)] = annotation;

        // TODO not updating labelled frames currently
        //this.labelledFrames.addLabelledFrame(frame);
        //this.updateFrameTrack(frame);
    }

    getAnnotation(frame) {
        return this.annotationTrack[this.getIndex(frame)];
    }

    getIndex(frame) {
        if (frame > this.annotationTrack.length || frame <= 0) {
            throw new Error("Invalid frame specified");
        }
        return frame - 1;
    }

    // FIXME super janky at the moment
    updateFrameTrack(frame) {
        const nextIndex = this.getIndex(this.labelledFrames.getNextLabelledFrame(frame));
        const prevIndex = this.getIndex(this.labelledFrames.getPrevLabelledFrame(frame));

        for (let index = prevIndex + 1; index < nextIndex; index++) {
            this.annotationTrack[index] = this.annotationTrack[this.getIndex(frame)];
        }
    }
}







