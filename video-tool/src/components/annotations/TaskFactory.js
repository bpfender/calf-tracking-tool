import { List, Map, setIn, updateIn } from "immutable";
import BoundingBox from "../canvas/BoundingBox";
import { loadTrack, TrackFactory } from "./TrackFactory";

// TODO add videoname key
export function TaskFactory() {
    return {
        videoHandle: null,
        totalFrames: null,
        selected: null,
        tracks: Map(),
        reviewed: List(),

        //FIXME potentially make keyframes mutable array that remains the same
        // once caluclated, persistent and ignored in undo/redo
        keyframes: List(),

        tags: Map(), // add ids for tag association

        toJSON: function () {
            let name = this.videoHandle;
            if (this.videoHandle &&
                typeof this.videoHandle !== 'string') {
                name = this.videoHandle.name;
            }

            return [
                name,
                this.totalFrames,
                this.selected,
                this.tracks,
                this.reviewed,
                this.keyframes,
                this.tags,
            ];
        },

        setVideoHandle: function (handle) {
            return setIn(this, ['videoHandle'], handle);
        },

        setTotalFrames: function (frames) {
            const newTask = setIn(this, ['totalFrames'], frames);
            //   newTask.reviewed = List(Array(frames).fill(0));
            return newTask;
        },

        setSelected: function (key) {
            return setIn(this, ['selected'], key);
        },

        addTrack: function (key, tag) {
            const track = TrackFactory(this.totalFrames);
            const newTask = updateIn(this, ['tracks'], tracks =>
                tracks.set(key, track));

            let newTags = null;
            if (this.tags.has(tag)) {
                newTags = this.tags.updateIn([tag], (list) => list.push(key));
            } else {
                newTags = this.tags.set(tag, List([key]));
            }
            // Effectively withMutations(), just on plain JS obj
            newTask.tags = newTags;

            return newTask;
        },

        deleteTrack: function (key, tag) {
            const newTask = updateIn(this, ['tracks'], tracks =>
                tracks.delete(key));

            const newTags = newTask.tags.updateIn([tag], (list) =>
                list.delete(list.findIndex(val => val === key)));

            newTask.tags = newTags;
            return newTask;
        },

        updateTrack: function (key, track) {
            return setIn(this, ['tracks', key], track);
        },

        setTrackName: function (key, name) {
            return updateIn(this, ['tracks', key], track =>
                track.setName(name));
        },

        setTrackColour: function (key, colour) {
            return updateIn(this, ['tracks', key], track =>
                track.setColour(colour));
        },

        toggleTrackVisible: function (key) {
            return updateIn(this, ['tracks', key], track =>
                track.toggleVisible());
        },

        setTrackLabel: function (key, frame, label) {
            return updateIn(this, ['tracks', key], track =>
                track.setLabel(frame, label));
        },

        setKeyframes: function (keyframeArray) {
            return setIn(this, ['keyframes'], List(keyframeArray));
        },

        getTrack: function (key) {
            return this.tracks.get(key);
        },

        getSelectedTrack: function () {
            return this.tracks.get(this.selected);
        },

        getTagIds: function (tag) {
            return this.tags.get(tag);
        },

        getBoundingBoxes: function (frame, width, height) {
            return [...this.tracks.entries()]
                .filter(([key, track]) => track.getLabel(frame)) //filter nulls(cut)
                .filter(([key, track]) => track.visible)
                .map(([key, track]) => {
                    const label = track.getLabel(frame);
                    return new BoundingBox(
                        key,
                        track.colour,
                        key === this.selected,
                        label.x * width,
                        label.y * height,
                        label.w * width,
                        label.h * height,
                        label.rotation,
                    );
                });
        },

        setReviewed: function (frame) {
            const i = this.reviewed.findIndex(val => frame <= val);
            if (i === -1) {
                return updateIn(this, ['reviewed'], list =>
                    list.push(frame)
                );
            }
            else if (this.reviewed.get(i) === frame) {

                return this;
            } else {
                return updateIn(this, ['reviewed'], list =>
                    list.insert(i, frame)
                );
            }
        },

        unsetReviewed: function (frame) {
            const i = this.reviewed.findIndex(val => val === frame);

            if (i === -1) {
                return this;
            } else {
                return updateIn(this, ['reviewed'], list =>
                    list.delete(i)
                );
            }
        },

        isReviewed: function (frame) {
            return this.reviewed.includes(frame)
        },

        isKeyframe: function (frame) {
            return this.keyframes.includes(frame);
        },

        keyframeIndex: function (frame) {
            return this.keyframes.indexOf(frame);
        }
    };
}

export function loadTask(parsedTask) {
    const task = TaskFactory();
    task.videoHandle = parsedTask[0];
    task.totalFrames = parsedTask[1];
    task.selected = parsedTask[2];
    task.tracks = Map(Object.entries(parsedTask[3]).map(entry => [entry[0], loadTrack(entry[1])]));
    task.reviewed = List(parsedTask[4]);
    task.keyframes = List(parsedTask[5]);

    task.tags = Map(Object.entries(parsedTask[6]).map(entry => [entry[0], List(entry[1])]));
    return task;
}


/*
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

export function deleteTrack(task, key, tag) {
    const newMap = task.tracks.delete(key);
    const newTask = setTrackMap(task, key, newMap);

    const newTags = newTask.tags.updateIn([tag], (list) =>
        list.delete(list.findIndex(val => val === key)));

    newTask.tags = newTags;
    return newTask;
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
*/