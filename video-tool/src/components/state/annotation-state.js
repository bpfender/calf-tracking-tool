export const defaultAnnotationState = {

}

export function annotationReducer(state, action) {
    const payload = action.payload;
    const newState = state;
    console.log("REDUCER", newState);
    switch (action.type) {
        case 'ADD_TRACK': {
            const { colour, totalFrames } = payload;
            newState.addTrack(colour, totalFrames);
            return newState;
        }
        case 'DELETE_TRACK': {
            const { key } = payload;
            newState.deleteTrack(key);
            return newState;
        }
        case 'SET_TRACK_NAME': {
            const { key, name } = payload;
            newState.setTrackName(key, name);
            return newState;
        }
        case 'SET_TRACK_COLOUR': {
            const { key, colour } = payload;
            newState.setTrackColour(key, colour);
            return newState;
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
