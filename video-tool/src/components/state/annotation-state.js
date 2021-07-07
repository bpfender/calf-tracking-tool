import { addTrack, deleteTrack, setAnnotation, setTotalFrames, setTrackColour, setTrackName } from "../annotations/Annotations";

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
            return setTrackName(state, key, name);
        }
        case 'SET_TRACK_COLOUR': {
            const { key, colour } = payload;
            return setTrackColour(state, key, colour);
        }
        case 'EDIT_FRAME_ANNOTATION': {
            const { key, frame, annotation } = payload;
            return setAnnotation(state, key, frame, annotation);
        }
        case 'SET_TOTAL_FRAME_COUNT': {
            const { totalFrames } = payload;
            return setTotalFrames(state, totalFrames);
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
