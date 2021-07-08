import Immutable from "immutable";
import BoundingBox from '../canvas/BoundingBox';

export const annotationFactory = (totalFrames) => {
    return {
        tracks: Immutable.Map(),
        totalFrames: totalFrames,
    };
}

function annotationTrackFactory(totalFrames, colour = "#48AFF0") {
    return {
        name: null,
        colour: colour,
        visible: true,
        frames: Immutable.List(Array(totalFrames).fill(frameLabelFactory())),
    };
}

function frameLabelFactory() {
    return {
        x: 400,
        y: 300,
        w: 50,
        h: 50,
        rotation: 45,
        labelled: false,
    };
}

// QUESTION not sure about functionality
// TODO some sort of autonaming convention iterator
// TODO some kind of auto changing colour iterator
//---- ANNOTATION -----
//FIXME what to do if frame count changes with annotationTracks
export const setTotalFrames = (annotations, totalFrames) => {
    return Immutable.setIn(annotations, ['totalFrames'], totalFrames);
}

export const addTrack = (annotations, key) => {
    const track = annotationTrackFactory(annotations.totalFrames);
    const newMap = annotations.tracks.set(key, track);
    return Immutable.setIn(annotations, ['tracks'], newMap);
}

export const deleteTrack = (annotations, key) => {
    const newMap = annotations.tracks.delete(key);
    return Immutable.setIn(annotations, ['tracks'], newMap);
}

// FIXME more functional appraoch to value checking?
export const getTrack = (annotations, key) => {
    const track = annotations.tracks.get(key);
    if (track === undefined) {
        throw new Error("Id" + key + "does not exist");
    }
    return track;
}

export const setTrackColour = (annotations, key, colour) => {
    const track = getTrack(annotations, key);
    const newTrack = setColour(track, colour);
    return editTrack(annotations, key, newTrack);
}

export const setTrackName = (annotations, key, name) => {
    const track = getTrack(annotations, key);
    const newTrack = setName(track, name);
    return editTrack(annotations, key, newTrack);

}

export const editTrack = (annotations, key, newTrack) => {
    const newMap = annotations.tracks.set(key, newTrack);
    return Immutable.setIn(annotations, ['tracks'], newMap);
}

export const setColour = (track, colour) => {
    return Immutable.setIn(track, ['colour'], colour);
}

export const setName = (track, name) => {
    return Immutable.setIn(track, ['name'], name);
}

export const toggleVisible = (track) => {
    return Immutable.setIn(track, ['visible'], !track.visible);
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

export const getAllFrameAnnotations = (annotations, frame) => {
    const annotationsList = [...annotations.tracks.values()].map(track => {
        return getLabel(track, frame);
    })
    return annotationsList;
}

// ----- TRACK -------
export const getLabel = (track, frame) => {
    const index = frame - 1;
    return track.frames.get(index, track);
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