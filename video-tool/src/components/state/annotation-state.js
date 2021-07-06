import { addTrack, deleteTrack, editTrack, setAnnotation, setColour, setLabelled, setName } from "../annotations/Annotations";

export function defaultAnnotationState(totalFrames) {
    this.annotations = new Map();
    this.totalFrames = totalFrames;
};

export function annotationTrack(totalFrames) {
    this.name = null;
    this.colour = "#48AFF0";
    this.annotationTrack = new Array(totalFrames).fill(new frameAnnotation())
}

function frameAnnotation() {
    this.x = 300;
    this.y = 400;
    this.w = 50;
    this.h = 50;
    this.rotation = 45;
    this.labelled = false;
}

export function annotationReducer(state, action) {
    const payload = action.payload;
    console.log(state);
    //console.log("REDUCER", newState);
    switch (action.type) {
        case 'ADD_TRACK': {
            const { key } = payload;
            return addTrack(state, key);
        }
        case 'DELETE_TRACK': {
            const { key } = payload;
            return deleteTrack(state, key);
        }
        case 'SET_TRACK_NAME': {
            const { key, name } = payload;
            return editTrack(state, key, setName, name);
        }
        case 'SET_TRACK_COLOUR': {
            const { key, colour } = payload;
            return editTrack(state, key, setColour, colour);
        }
        case 'EDIT_FRAME_ANNOTATION': {
            const { key, frame, annotation } = payload;
            return setAnnotation(state, key, frame, annotation);
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
