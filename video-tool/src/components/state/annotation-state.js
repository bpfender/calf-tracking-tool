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
    const newState = state;
    //console.log("REDUCER", newState);
    switch (action.type) {
        case 'ADD_TRACK': {
            const { key } = payload;
            console.log({ ...state });
            newState.addTrack(key);
            return newState;
        }
        case 'DELETE_TRACK': {
            const { key } = payload;
            newState.deleteTrack(key);
            return newState;
        }
        case 'SET_TRACK_NAME': {
            const { key, name } = payload;
            return newState.setTrackName(key, name);
        }
        case 'SET_TRACK_COLOUR': {
            const { key, colour } = payload;
            return newState.setTrackColour(key, colour);
        }
        case 'EDIT_FRAME_ANNOTATION': {
            const { key, frame, annotation } = payload;
            newState.addFrameAnnotation(key, frame, annotation);
            return newState;
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
