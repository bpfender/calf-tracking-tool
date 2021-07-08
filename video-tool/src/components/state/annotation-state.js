import { addTrack, deleteTrack, editTrack, getTrack, setLabel, setSelected, setTotalFrames, setTrackColour, setTrackName, toggleVisible } from "../annotations/Annotations";

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
        case 'EDIT_FRAME_LABEL': {
            const { key, frame, annotation } = payload;
            return setLabel(state, key, frame, annotation);
        }
        case 'TOGGLE_VISIBLE': {
            const { key } = payload;
            return editTrack(state, key, toggleVisible(getTrack(state, key)));
        }
        case 'SET_SELECTED': {
            const { key } = payload;
            return setSelected(state, key);
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
