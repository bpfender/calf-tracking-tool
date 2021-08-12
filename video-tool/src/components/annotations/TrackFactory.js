import { List, setIn } from "immutable";
import { colourGen } from "../utils";
import { getNextAnchor, getPrevAnchor, setAnchorFrame } from "./Anchor";
import { LabelFactory } from "./LabelFactory";

export function TrackFactory(totalFrames) {
    return {
        name: null,
        colour: colourGen.next().value,
        visible: true,
        labels: List(Array(totalFrames).fill(LabelFactory())),
        anchors: List(),
        predicted: List(),

        toJSON: function () {
            return [this.name,
            this.colour,
            this.visible,
            this.labels,
            this.anchors,
            this.predicted];
        }
    }
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
    console.log([...newAnchors]);
    const trackNewAnchors = setIn(track, ['anchors'], newAnchors);

    return setIn(trackNewAnchors, ['labels'], newLabels);
}

// QUESTION performance of withmutations vs other methods?
// Need to work with mutableList as we depend on mutated values
function interpolateLabels(mutableList, startFrame, endFrame) {
    const startLabel = mutableList.get(startFrame - 1);
    const endLabel = mutableList.get(endFrame - 1);
    const frameCount = endFrame - startFrame;
    console.log("INTERP", startLabel, endLabel, frameCount);

    const keys = Object.keys(startLabel);

    const frameDelta = Object.fromEntries(keys.map(key => {
        const val = [
            key,
            (endLabel[key] - startLabel[key]) / frameCount
        ];
        console.log(val);
        return val;
    }))
    console.log(frameDelta);

    for (let i = startFrame; i < endFrame - 1; i++) {

        const newVals = Object.fromEntries(keys.map(key => {
            const val = ([
                key,
                Math.round(startLabel[key] + frameDelta[key] * (i - (startFrame - 1)))
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

        mutableList.set(i, label);
    }

}

