import { List, Map, setIn } from "immutable";
import BoundingBox from "../canvas/BoundingBox";
import { getLabel, loadTrack, TrackFactory } from "./TrackFactory";

// TODO add videoname key
export function TaskFactory(videoHandle) {
    return {
        videoHandle: videoHandle,
        totalFrames: null,
        selected: null,
        tracks: Map(),
        reviewed: List(),
        keyFrames: List(),

        tags: Map(), // add ids that belong to which tag

        toJSON: function () {
            return [
                this.videoHandle.name,
                this.totalFrames,
                this.selected,
                this.tracks,
                this.reviewed,
                this.keyFrames
            ];
        }
    };
}

export function loadTask(parsedTask) {
    const task = TaskFactory();
    task.videoHandle = parsedTask[0];
    task.totalFrames = parsedTask[1];
    task.select = parsedTask[2];
    task.tracks = Map(Object.entries(parsedTask[3]).map(entry => [entry[0], loadTrack(entry[1])]));
    task.reviewed = List(parsedTask[4]);
    task.keyFrames = List(parsedTask[5]);

    task.tags = Map();

    return task;
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
    // FIXME this might reset on load
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

export function addTrack(task, key, tag) {
    const track = TrackFactory(task.totalFrames);
    const newTask = setTrack(task, key, track);

    const tags = newTask.tags;
    let newTags = null;

    if (tags.has(tag)) {
        newTags = tags.updateIn([tag], (list) => list.push(key));
    } else {
        newTags = tags.set(tag, List([key]));
    }

    newTask.tags = newTags;

    return newTask;
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