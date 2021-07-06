import BoundingBox from '../canvas/BoundingBox';
import { annotationTrack } from '../state/annotation-state';


// QUESTION not sure about functionality
// TODO some sort of autonaming convention
// TODO some kind of auto changing colour
//---- ANNOTATION -----
export const addTrack = (state, key) => {
    const newState = { ...state };
    const track = new annotationTrack(newState.totalFrames);
    newState.annotations.set(key, track);
    return newState;
}

export const deleteTrack = (state, key) => {
    const newState = { ...state };
    newState.annotations.delete(key);
    return newState;
}

export const getTrack = (state, key) => {
    const track = state.annotations.get(key);
    // FIXME more functional appraoch?
    if (track === undefined) {
        throw new Error("Id" + key + "does not exist");
    }
    return track;
}

export const editTrack = (state, key, edit, editValue) => {
    const newState = { ...state };
    const track = getTrack(newState, key);
    const newTrack = edit(track, editValue);
    newState.annotations.set(key, newTrack);
    return newState;
}

export const getBoundingBoxes = (state, frame) => {
    const annotationsList = getAllFrameAnnotations(state, frame);
    const bboxes = [];
    annotationsList.forEach(track => {
        const bbox = new BoundingBox(
            track.x,
            track.y,
            track.w,
            track.h,
            track.rotation,
        )
        bboxes.push(bbox);
    });
    return bboxes;
}

export const getAllFrameAnnotations = (state, frame) => {
    const annotationsList = [];

    state.annotations.forEach(track => {
        const frameAnnotation = getFrameAnnotation(track, frame);
        annotationsList.push(frameAnnotation);
    })
    return annotationsList;
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

export const getFrameAnnotation = (track, frame) => {
    return track.annotationTrack[frame];
}


// ---- FRAME ----
export const setAnnotation = (state, key, frame, annotation) => {
    const newState = { ...state };
    const track = getTrack(newState, key);
    track.annotationTrack[frame] = annotation;

}

export const setLabelled = (frame, bool) => {
    const newFrame = { ...frame };
    newFrame.labelled = bool;
}