// TODO frame serach could probably be reimplemented as BSTs
import Immutable from "immutable";
import BoundingBox from '../canvas/BoundingBox';

function* colourGenerator() {
    // FIXME this is duplicated for colour palette
    const colours = [
        "#48AFF0", "#3DCC91", "#FFB366",
        "#FF7373", "#FF6E4A", "#FF66A1",
        "#C274C2", "#AD99FF", "#669EFF",
        "#2EE6D6", "#62D96B", "#FFC940"]

    let i = 0;

    while (true) {
        yield colours[i]
        i = (i + 1) % colours.length;
    }
}

const gen = colourGenerator();

export const annotationFactory = (totalFrames) => {
    return {
        tracks: Immutable.Map(),
        totalFrames: totalFrames,
        reviewedFrames: Immutable.List(),
        selected: null,
    };
}

export function annotationTrackFactory(totalFrames) {
    return {
        name: null,
        colour: gen.next().value,
        visible: true,
        labelledFrames: Immutable.List(), //FIXME interpolation shouldn't override prediction
        predictedFrames: Immutable.List(), //FIXME not handled at all currently
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

export const setReviewed = (annotations, bool) => {
    return Immutable.setIn(annotations, ['reviewedFrames'], bool);
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

export const generateJSON = (annotations) => {
    const output = {
        tracks: annotations.tracks.toJS(),
        totalFrames: annotations.totalFrames,
        reviewedFrames: annotations.reviewedFrames.toJS(),
        selected: annotations.selected
    };

    return output;
}


export const readJSON = (annotations) => {
    const output = {
        tracks: Immutable.fromJS(annotations.tracks),
        totalFrames: annotations.totalFrames,
        reviewedFrames: Immutable.fromJS(annotations.reviewedFrames),
        selected: annotations.selected,
    }

}

