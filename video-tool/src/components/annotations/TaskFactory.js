import { fromJS, isKeyed, List, Map, setIn } from "immutable";
import BoundingBox from "../canvas/BoundingBox";
import { getLabel, TrackFactory } from "./TrackFactory";

// TODO add videoname key
export function TaskFactory(totalFrames) {
    return {
        totalFrames: totalFrames,
        selected: null,
        tracks: Map(),
        reviewed: List(Array(totalFrames).fill(false)),
        keyFrames: List(),
    };
}

export function setTotalFrames(task, frames) {
    return setIn(task, ['totalFrames'], frames);
}

export function setSelected(task, key) {
    return setIn(task, ['selected'], key);
}

export function setTrackMap(task, key, newMap) {
    return setIn(task, ['tracks'], newMap);
}

export function setTrack(task, key, newTrack) {
    const newMap = task.tracks.set(key, newTrack);
    return setTrackMap(task, key, newMap);
}

export function addTrack(task, key) {
    const track = TrackFactory(task.totalFrames);
    return setTrack(task, key, track);
}

export function deleteTrack(task, key) {
    const newMap = task.tracks.delete(key);
    return setTrackMap(task, key, newMap);
}

export function getTrack(task, key) {
    const track = task.tracks.get(key);
    if (track === undefined) {
        throw new Error("Id" + key + "does not exist");
    }
    return track;
}

export function setReviewed(task, frame, bool) {
    const newReviewed = task.reviewed.set(frame - 1, bool);
    return setIn(task, ['reviewed'], newReviewed);
}

export function getBoundingBoxes(task, frame) {
    return [...task.tracks.entries()]
        .filter(([key, track]) => track.visible)
        .map(([key, track]) => {
            const label = getLabel(track, frame);
            console.log(label);
            return new BoundingBox(
                key,
                track.colour,
                key === task.selected,
                label.x,
                label.y,
                label.w,
                label.h,
                label.rotation,
            );
        });
}

export const generateJSON = (task) => {
    const output = {
        tracks: task.tracks.toJS(),
        totalFrames: task.totalFrames,
        reviewed: task.reviewed.toJS(),
        selected: task.selected
    };
    console.log(output);
    return output;
}


export const readJSON = (task) => {
    const output = {
        tracks: fromJS(task.tracks, reviver),
        totalFrames: task.totalFrames,
        reviewed: fromJS(task.reviewed),
        selected: task.selected,
    }

    return output;
}

function reviver(key, value) {
    if (key === "") {
        return value.toMap();
    }
    return isKeyed(value) ? value.toObject() : value.toList()
}