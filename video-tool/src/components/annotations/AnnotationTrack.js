import LabelledFrames from "./LabelledFrames";

class AnnotationTrack {
    constructor(frameCount) {
        this.annotationTrack = [];
        this.labelledFrames = new LabelledFrames();
        this.frameCount = frameCount;
    }

    setAnnotation(frame, annotation) {
        this.annotationTrack[this.getIndex(frame)] = annotation;

        this.labelledFrames.addLabelledFrame(frame);

        this.updateFrameTrack(frame);
    }

    getAnnotation(frame) {
        if (frame > this.getAnnotationframeCount || frame <= 0) {
            throw new Error("Invalid frame specified");
        }

        return this.annotationTrack[this.getIndex(frame)];
    }

    getIndex(frame) {
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

export default AnnotationTrack;








