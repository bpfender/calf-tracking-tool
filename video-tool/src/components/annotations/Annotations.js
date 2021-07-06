import BoundingBox from '../canvas/BoundingBox';
import { annotationTrack } from '../state/annotation-state';
import AnnotationTrack from "./AnnotationTrack";

// QUESTION not sure about functionality
// TODO some sort of autonaming convention
// TODO some kind of auto changing colour
//---- ANNOTATION -----
export const addTrack = (state, key, totalFrames) => {
    const newState = { ...state };
    const track = new annotationTrack(totalFrames);
    newState.set(key, track);
    return newState;
}

export const deleteTrack = (state, key) => {
    const newState = { ...state };
    newState.delete(key);
    return newState;
}

export const getTrack = (state, key) => {
    const track = state.get(key);
    // FIXME more functional appraoch?
    if (track === undefined) {
        throw new Error("Id" + key + "does not exist");
    }
    return track;
}


// ----- TRACK -------
export const setName = (track, name) => {
    const newTrack = { ...track };
    newTrack.name = name;
    return newTrack;
}

export const setColour = (track, colour) => {
    const newTrack = { ...track };
    newTrack.colour = colour;
    return newTrack;
}


// ---- FRAME ----
export const setAnnotation = (frame, x, y, w, h, rot) => {
    const newFrame = { ...frame };
    newFrame.x = x;
    newFrame.y = y;
    newFrame.w = w;
    newFrame.h = h;
    newFrame.rotation = rot;
}

export const setLabelled = (frame, bool) => {
    const newFrame = { ...frame };
    newFrame.labelled = bool;
}






export default class Annotations {
    constructor(totalFrames) {
        this.annotations = new Map();
        this.totalFrames = totalFrames;
    }

    addTrack(key) {
        const track = new AnnotationTrack(this.totalFrames);
        this.annotations = this.annotations.set(key, track);
    }

    deleteTrack(key) {
        this.annotations.delete(key);
    }

    getTrack(key) {
        const track = this.annotations.get(key);
        if (track === undefined) {
            throw new Error("Id" + key + "does not exist");
        }
        return track;
    }

    getTrackKeys() {
        return [...this.annotations.keys()];
    }

    setTrackName(key, name) {
        const track = this.getTrack(key);
        track.setName(name);
        return this;
    }

    setTrackColour(key, colour) {
        const track = this.getTrack(key);
        track.setColour(colour);
    }

    getAllFrameAnnotations(frame) {
        const annotationList = [];
        this.annotations.forEach(track => {
            //FIXME this is super dirty at the moment
            if (track.getAnnotation(frame) !== undefined) {
                annotationList.push(track.getAnnotation(frame));
            }
        })
        console.log("Annotation List", annotationList);
        return annotationList;
    }

    addFrameAnnotation(key, frame, annotation) {
        const track = this.getTrack(key);
        track.setAnnotation(frame, annotation);
    }

    getBoundingBoxes(frame) {
        const annotations = this.getAllFrameAnnotations(frame);
        console.log("Get BB Frame" + frame, annotations);
        const keys = this.getTrackKeys();
        const bboxes = [];

        annotations.forEach((element, index) => {
            const bbox = new BoundingBox(
                element.x,
                element.y,
                element.width,
                element.height,
                element.rotation,
            );
            bboxes.push(bbox);
        });

        return bboxes;
    }




}