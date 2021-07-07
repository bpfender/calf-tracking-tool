import Immutable from "immutable";
import BoundingBox from '../canvas/BoundingBox';

//FIXME rename to capitals
export function defaultAnnotationState(totalFrames) {
    this.annotations = Immutable.Map();
    this.totalFrames = totalFrames;
};

export const defaultAnnotation = {
    annotations: Immutable.Map(),
    totalFrames: 86302,
}

export function annotationTrack(totalFrames) {
    this.name = null;
    this.colour = "#48AFF0";
    this.annotationTrack = Immutable.List(Array(totalFrames).fill(new frameAnnotation()));
}

function frameAnnotation() {
    this.x = 300;
    this.y = 400;
    this.w = 50;
    this.h = 50;
    this.rotation = 45;
    this.labelled = false;
}

// QUESTION not sure about functionality
// TODO some sort of autonaming convention
// TODO some kind of auto changing colour
//---- ANNOTATION -----
//FIXME what to do if frame count changes with annotationTracks
export const setTotalFrames = (state, totalFrames) => {
    return Immutable.setIn(state, ['totalFrames'], totalFrames);
}

export const addTrack = (state, key) => {
    const track = new annotationTrack(state.totalFrames);
    const map = state.annotations.set(key, track);
    return Immutable.setIn(state, ['annotations'], map);
}

export const deleteTrack = (state, key) => {
    const map = state.annotations.delete(key);
    return Immutable.setIn(state, ['annotations'], map);
}

// FIXME more functional appraoch to value checking?
export const getTrack = (state, key) => {
    const track = state.annotations.get(key);
    if (track === undefined) {
        throw new Error("Id" + key + "does not exist");
    }
    return track;
}

export const setTrackColour = (state, key, colour) => {
    const track = Immutable.setIn(getTrack(state, key), ['colour'], colour);
    const map = state.annotations.setIn([toString(key)], track);
    return Immutable.setIn(state, ['annotations'], map);
}

export const setTrackName = (state, key, name) => {
    const track = Immutable.setIn(getTrack(state, key), ['name'], name);
    const map = state.annotations.setIn([toString(key)], track);
    return Immutable.setIn(state, ['annotations'], map);
}

export const getBoundingBoxes = (state, frame) => {
    console.log(state);
    const annotationsList = getAllFrameAnnotations(state, frame);
    console.log(annotationsList);
    const bboxes = annotationsList.map(track => {
        console.log("TRACK", track)
        return new BoundingBox(
            track.x,
            track.y,
            track.w,
            track.h,
            track.rotation,
        )
    });
    console.log(bboxes);
    return bboxes;
}

export const getAllFrameAnnotations = (state, frame) => {
    const annotationsList = [...state.annotations.values()].map(track => {
        return getFrameAnnotation(track, frame);
    })
    return annotationsList;
}

// ----- TRACK -------
export const getFrameAnnotation = (track, frame) => {
    return track.annotationTrack.get(frame, track);
}


// ---- FRAME ----
export const setAnnotation = (state, key, frame, annotation) => {
    const oldTrack = getTrack(state, key)
    const newTrack = oldTrack.set(frame, annotation);
    const annotationTrackObj = state.annotations.get(key);
    const newAnnotationTrackObj = Immutable.setIn(annotationTrackObj, ['annotationTrack'], newTrack);
    const map = state.annotation.setIn([toString(key)], newAnnotationTrackObj);
    return Immutable.setIn(state, ['annotations'], map);
}

export const setLabelled = (frame, bool) => {
    const newFrame = { ...frame };
    newFrame.labelled = bool;
}