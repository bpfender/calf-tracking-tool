import { LAYER } from "@blueprintjs/icons/lib/esm/generated/iconContents";
import { List, setIn } from "immutable";
import { colourGen } from "../utils";
import { getNextAnchor, getPrevAnchor, setAnchorFrame } from "./Anchor";
import { LabelFactory, loadLabel } from "./LabelFactory";

export function TrackFactory(totalFrames) {
    return {
        name: null,
        colour: colourGen.next().value,
        visible: true,
        labels: List(Array(totalFrames).fill(LabelFactory())),
        anchors: List(),

        toJSON: function () {
            return [
                this.name,
                this.colour,
                this.visible,
                this.labels,
                this.anchors,
            ];
        },

        setName: function (name) {
            return setIn(this, ['name'], name);
        },

        setColour: function (colour) {
            return setIn(this, ['colour'], colour);
        },

        toggleVisible: function () {
            return setIn(this, ['visible'], !this.visible);
        },

        setLabel: function (frame, label) {
            const prevFrame = getPrevAnchor(this.anchors, frame);
            const nextFrame = getNextAnchor(this.anchors, frame);
            let newLabels = null;

            console.log(frame, label);
            if (prevFrame === -1 && nextFrame === -1) {
                newLabels = List(Array(this.labels.size).fill(label));

            } else if (prevFrame === -1) {
                newLabels = this.labels.withMutations(list => {
                    for (let i = 0; i < frame; i++) {
                        list.set(i, label);
                    }
                    this.interpolateLabels(list, frame, nextFrame);
                });
            } else if (nextFrame === -1) {
                newLabels = this.labels.withMutations(list => {
                    for (let i = frame - 1; i < this.labels.size; i++) {
                        list.set(i, label);
                    }
                    this.interpolateLabels(list, prevFrame, frame);
                });
            } else {
                newLabels = this.labels.withMutations(list => {
                    list.set(frame - 1, label);
                    this.interpolateLabels(list, prevFrame, frame);
                    this.interpolateLabels(list, frame, nextFrame);
                });
            }

            const newAnchors = setAnchorFrame(this.anchors, frame);
            const trackNewAnchors = setIn(this, ['anchors'], newAnchors);

            return setIn(trackNewAnchors, ['labels'], newLabels);
        },

        // QUESTION performance of withmutations vs other methods?
        // Need to work with mutableList as we depend on mutated values
        interpolateLabels: function (mutableList, startFrame, endFrame) {
            const startLabel = mutableList.get(startFrame - 1);
            const endLabel = mutableList.get(endFrame - 1);
            const frameCount = endFrame - startFrame;
            const keys = ['x', 'y', 'w', 'h', 'rotation'];

            if (!endLabel) {
                for (let i = startFrame; i < endFrame - 1; i++) {
                    mutableList.set(i, startLabel);
                }
            } else {
                const frameDelta = Object.fromEntries(keys.map(key => {
                    const val = [
                        key,
                        (endLabel[key] - startLabel[key]) / frameCount
                    ];
                    return val;
                }))

                for (let i = startFrame; i < endFrame - 1; i++) {
                    const newVals = Object.fromEntries(keys.map(key => {
                        const val = ([
                            key,
                            startLabel[key] + frameDelta[key] * (i - (startFrame - 1))
                        ]);

                        return val;
                    }));

                    const label = LabelFactory(
                        newVals.x,
                        newVals.y,
                        newVals.w,
                        newVals.h,
                        newVals.rotation,
                    );
                    mutableList.set(i, label);
                }
            }
        },

        getLabel: function (frame) {
            return this.labels.get(frame - 1);
        },

        cutLabel: function (frame) {
            let nextFrame = getNextAnchor(this.anchors, frame);
            if (nextFrame === -1) {
                nextFrame = this.labels.size;
            }

            const newLabels = this.labels.withMutations(list => {
                for (let i = frame - 1; i < nextFrame - 1; i++) {
                    list.set(i, null);
                }
            });

            const newAnchors = setAnchorFrame(this.anchors, frame);
            const trackNewAnchors = setIn(this, ['anchors'], newAnchors);

            return setIn(trackNewAnchors, ['labels'], newLabels);
        },

        insertLabel: function (frame) {
            const nextFrame = getNextAnchor(this.anchors, frame);
            const prevFrame = getPrevAnchor(this.anchors, frame);
            console.log(prevFrame, nextFrame);
            //Get last label before cut
            let prevLabel = null;
            if (prevFrame === -1) {
                prevLabel = LabelFactory();
            } else {
                prevLabel = this.getLabel(prevFrame - 1);
            }

            let newLabels = null;
            if (nextFrame === -1) {
                newLabels = this.labels.withMutations(list => {
                    for (let i = frame - 1; i < this.labels.size; i++) {
                        list.set(i, prevLabel);
                    }
                });
            } else {
                newLabels = this.labels.withMutations(list => {
                    list.set(frame - 1, prevLabel);
                    this.interpolateLabels(list, frame, nextFrame);
                });
            }

            const newAnchors = setAnchorFrame(this.anchors, frame);
            const trackNewAnchors = setIn(this, ['anchors'], newAnchors);

            return setIn(trackNewAnchors, ['labels'], newLabels);
        }
    };
}

export function loadTrack(parsedTrack) {
    const track = TrackFactory();
    track.name = parsedTrack[0];
    track.colour = parsedTrack[1];
    track.visible = parsedTrack[2];
    track.labels = List(parsedTrack[3].map(label => loadLabel(label)));
    track.anchors = List(parsedTrack[4]);

    return track;
}










export function setName(track, name) {
    return setIn(track, ['name'], name);
}

export function setColour(track, colour) {
    return setIn(track, ['colour'], colour);
}

export function toggleVisible(track) {
    return setIn(track, ['visible'], !track.visible);
}

export function getLabel(track, frame) {
    return track.labels.get(frame - 1, track);
}

export function setLabel(track, frame, label) {
    const prevFrame = getPrevAnchor(track.anchors, frame);
    const nextFrame = getNextAnchor(track.anchors, frame);
    let newLabels = null;

    console.log(frame, label);
    if (prevFrame === -1 && nextFrame === -1) {
        newLabels = List(Array(track.labels.size).fill(label));

    } else if (prevFrame === -1) {
        newLabels = track.labels.withMutations(list => {
            for (let i = 0; i < frame; i++) {
                list.set(i, label);
            }
            interpolateLabels(list, frame, nextFrame);
        });
    } else if (nextFrame === -1) {
        newLabels = track.labels.withMutations(list => {
            for (let i = frame - 1; i < track.labels.size; i++) {
                list.set(i, label);
            }
            interpolateLabels(list, prevFrame, frame);
        });
    } else {
        newLabels = track.labels.withMutations(list => {
            list.set(frame - 1, label);
            interpolateLabels(list, prevFrame, frame);
            interpolateLabels(list, frame, nextFrame);
        });
    }

    const newAnchors = setAnchorFrame(track.anchors, frame);
    const trackNewAnchors = setIn(track, ['anchors'], newAnchors);

    return setIn(trackNewAnchors, ['labels'], newLabels);
}

// QUESTION performance of withmutations vs other methods?
// Need to work with mutableList as we depend on mutated values
function interpolateLabels(mutableList, startFrame, endFrame) {
    const startLabel = mutableList.get(startFrame - 1);
    const endLabel = mutableList.get(endFrame - 1);
    const frameCount = endFrame - startFrame;
    const keys = ['x', 'y', 'w', 'h', 'rotation'];


    /*const frameDelta = {
        x: (endLabel.x - startLabel.x) / frameCount,
        y: (endLabel.y - startLabel.y) / frameCount,
        w: (endLabel.w - startLabel.w) / frameCount,
        h: (endLabel.h - startLabel.h) / frameCount,
        rotation: (endLabel.rotation - startLabel.rotation) / frameCount,
    }*/

    const frameDelta = Object.fromEntries(keys.map(key => {
        const val = [
            key,
            (endLabel[key] - startLabel[key]) / frameCount
        ];
        console.log(val);
        return val;
    }))
    console.log("FRAME_DELTA", frameDelta);

    for (let i = startFrame; i < endFrame - 1; i++) {

        /* const newVals = {
             x: startLabel.x + frameDelta.x * (i - (startFrame - 1)),
             y: startLabel.y + frameDelta.y * (i - (startFrame - 1)),
             w: startLabel.w + frameDelta.w * (i - (startFrame - 1)),
             h: startLabel.h + frameDelta.h * (i - (startFrame - 1)),
             rotation: startLabel.rotation + frameDelta.rotation * (i - (startFrame - 1)),
         }*/

        const newVals = Object.fromEntries(keys.map(key => {
            const val = ([
                key,
                startLabel[key] + frameDelta[key] * (i - (startFrame - 1)),
            ]);

            return val;
        }))

        const label = LabelFactory(
            newVals.x,
            newVals.y,
            newVals.w,
            newVals.h,
            newVals.rotation,
        );
        console.log(label);
        mutableList.set(i, label);
    }
}