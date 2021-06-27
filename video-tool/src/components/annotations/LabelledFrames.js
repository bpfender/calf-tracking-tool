class LabelledFrames {
    constructor() {
        this.labelledFrames = [];
    }

    addLabelledFrame(frame) {
        const i = this.getClosestIndex(frame);

        if (this.labelledFrames[i] !== frame) {
            this.labelledFrames.splice(i, 0, frame);
        }
    }

    getClosestIndex(frame) {
        return this.labelledFrames.findIndex(element => element >= frame);
    }

    frameIsLabelled(frame) {
        return this.labelledFrames.includes(frame);
    }

    getNextLabelledFrame(frame) {
        const i = this.getClosestIndex(frame);

        if (this.labelledFrame[i] === frame) {
            return this.labelledFrame[i + 1];
        } else {
            return this.labelledFrame[i];
        }
    }

    getPrevLabelledFrame(frame) {
        const i = this.getClosestIndex(frame);

        return this.labelledFrame[i - 1];
    }
}

export default LabelledFrames;