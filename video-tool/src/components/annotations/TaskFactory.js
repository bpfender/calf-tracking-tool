import { fromJS, isKeyed, List, Map, setIn } from "immutable";
import BoundingBox from "../canvas/BoundingBox";
import { getLabel, TrackFactory } from "./TrackFactory";

// TODO add videoname key
export function TaskFactory(videoHandle) {
    return {
        videoHandle: videoHandle,
        framerate: null,
        size: null,

        totalFrames: null,
        selected: null,
        tracks: Map(),
        reviewed: List(),
        keyFrames: List(),

        toJSON: function () {
            return [
                this.videoHandle.name,
                this.totalFrames,
                this.selected,
                this.tracks,
                this.reviewed,
                this.keyFrames]
        }
    }
}

// TODO Video name and handle can be combined
export function setVideoName(task, name) {
    return setIn(task, ['videoName'], name);
}

export function setVideoHandle(task, handle) {
    return setIn(task, ['videoHandle'], handle);
}

export function setTotalFrames(task, frames) {
    const newTask = setIn(task, ['totalFrames'], frames);
    newTask.reviewed = List(Array(frames).fill(0));
    return newTask;
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