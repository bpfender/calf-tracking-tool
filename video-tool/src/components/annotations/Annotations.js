import Immutable, { getIn } from "immutable";
import BoundingBox from '../canvas/BoundingBox';

export const annotationFactory = (totalFrames) => {
    return {
        tracks: Immutable.Map(),
        totalFrames: totalFrames,
        selected: null,
    };
}

export function annotationTrackFactory(totalFrames, colour = "#48AFF0") {
    return {
        name: null,
        colour: colour,
        visible: true,
        labelledFrames: Immutable.List(),
        frames: Immutable.List(Array(totalFrames).fill(frameLabelFactory())),
    };
}

// FIXME labelled probably not required
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

export const setSelected = (annotations, key) => {
    return Immutable.setIn(annotations, ['selected'], key);
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

export const getTrackColour = (annotations, key) => {
    return getTrack(annotations, key).colour;
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

//FIXME seems a bit unwieldy
export const getBoundingBoxes = (state, frame) => {
    const annotationsList = getFrameLabels(state, frame);
    const bboxes = annotationsList.map(track => {
        return new BoundingBox(
            track.key,
            track.colour,
            track.selected,
            track.x,
            track.y,
            track.w,
            track.h,
            track.rotation,
        )
    });

    return bboxes;
}

// FIXME selected code is a bit odd
export const getFrameLabels = (annotations, frame) => {
    const annotationsList = [...annotations.tracks.entries()]
        .filter(([key, track]) => track.visible)
        .map(([key, track]) => {
            return {
                ...getLabel(track, frame),
                colour: track.colour,
                selected: key === annotations.selected,
                key: key,
            };
        })

    return annotationsList;
}

// ----- TRACK -------
export const getLabel = (track, frame) => {
    const index = frame - 1;
    return track.frames.get(index, track);
}


// ---- FRAME ----
// FIXME this is horrible
export const setLabel = (annotations, key, frame, label) => {
    const index = frame - 1;
    const oldTrack = getTrack(annotations, key)
    const newTrack = oldTrack.frames.set(index, label);
    const annotationTrackObj = annotations.tracks.get(key);
    const newAnnotationTrackObj = Immutable.setIn(annotationTrackObj, ['frames'], newTrack);

    newAnnotationTrackObj.labelledFrames = addLabelledFrame(newAnnotationTrackObj.labelledFrames, frame);

    const nextFrame = getNextLabelledFrame(newAnnotationTrackObj.labelledFrames, frame);
    const prevFrame = getPrevLabelledFrame(newAnnotationTrackObj.labelledFrames, frame);
    console.log([...newAnnotationTrackObj.labelledFrames.values()]);
    console.log(prevFrame, nextFrame);

    const interpolatedTrack = updateFrameTrack(newAnnotationTrackObj, frame, prevFrame, nextFrame);
    console.log("INTER", [...interpolatedTrack]);
    const interpolatedObj = Immutable.setIn(newAnnotationTrackObj, ['frames'], interpolatedTrack);

    const map = annotations.tracks.set(key, interpolatedObj);
    return Immutable.setIn(annotations, ['tracks'], map);
}

// --- LABELLED FRAMES --- 
const addLabelledFrame = (labelledFrames, frame) => {
    const i = getInsertionIndex(labelledFrames, frame);
    if (labelledFrames.get(i) === frame) {
        return labelledFrames;
    }
    return labelledFrames.insert(i, frame);
}

const getInsertionIndex = (labelledFrames, frame) => {
    if (labelledFrames.size === 0) {
        return 0;
    }

    const index = labelledFrames.findIndex(elem => elem >= frame)
    return index >= 0 ? index : labelledFrames.size;
}

const getNextLabelledFrame = (labelledFrames, frame) => {
    const i = getInsertionIndex(labelledFrames, frame);

    if (i === labelledFrames.size) {
        return -1;
    }

    if (labelledFrames.get(i) === frame) {
        if (i === labelledFrames.size - 1) {
            return -1;
        }
        return labelledFrames.get(i + 1);
    } else {
        return labelledFrames.get(i);
    }
}

const getPrevLabelledFrame = (labelledFrames, frame) => {
    const i = getInsertionIndex(labelledFrames, frame);

    if (i === 0) {
        return -1;
    }

    return labelledFrames.get(i - 1);
}

// FIXME some strange handling front and rear
const updateFrameTrack = (track, frame, prevFrame, nextFrame) => {
    const prevIndex = prevFrame < 0 ? 0 : prevFrame - 1;
    const nextIndex = nextFrame < 0 ? track.frames.size - 1 : nextFrame - 1;
    const index = frame - 1;

    const prevInterpolated = interpolateLabels(track, prevIndex, index);
    const nextInterpolated = interpolateLabels(track, index, nextIndex);

    console.log("TRACK", [...prevInterpolated.values()]);
    console.log("TRACK", [...nextInterpolated.values()]);
    console.log("SPLICE", prevIndex, index, nextIndex);

    return track.frames
        .splice(prevIndex, index - prevIndex, ...prevInterpolated.toArray())
        .splice(index, nextIndex - index, ...nextInterpolated.toArray());
}

const interpolateLabels = (track, startIndex, endIndex) => {
    console.log("INTERP", startIndex, endIndex);
    console.log(track);
    const startLabel = getLabel(track, startIndex + 1);
    const endLabel = getLabel(track, endIndex + 1);
    const deltaFrames = endIndex - startIndex;

    console.log("LABELS", startLabel, endLabel);
    const diff = {
        x: (endLabel.x - startLabel.x) / deltaFrames,
        y: (endLabel.y - startLabel.y) / deltaFrames,
        w: (endLabel.w - startLabel.w) / deltaFrames,
        h: (endLabel.h - startLabel.h) / deltaFrames,
        rotation: (endLabel.rotation - startLabel.rotation) / deltaFrames,
    };
    console.log("DIFF", diff);
    // FIXME probably remove labelled tag
    return track.frames
        .slice(startIndex, endIndex)
        .map((elem, index) => {
            return {
                x: Math.round(startLabel.x + diff.x * index),
                y: Math.round(startLabel.y + diff.y * index),
                w: Math.round(startLabel.w + diff.w * index),
                h: Math.round(startLabel.h + diff.h * index),
                rotation: Math.round(startLabel.rotation + diff.rotation * index),
                labelled: elem.labelled,
            }
        });
}


