import { addTrack, deleteTrack, getTrack, setSelected, setTotalFrames, setTrack } from "../annotations/TaskFactory";
import { setColour, setLabel, setName, toggleVisible } from "../annotations/TrackFactory";

export function annotationReducer(task, action) {
    const payload = action.payload;
    switch (action.type) {
        case 'ADD_TRACK': {
            const { key } = payload;
            return addTrack(task, key);
        }
        case 'DELETE_TRACK': {
            const { key } = payload;
            return deleteTrack(task, key);
        }
        case 'SET_TRACK_NAME': {
            const { key, name } = payload;

            const newTrack = setName(getTrack(task, key), name);
            return setTrack(task, key, newTrack);
        }
        case 'SET_TRACK_COLOUR': {
            const { key, colour } = payload;

            const newTrack = setColour(getTrack(task, key), colour);
            return setTrack(task, key, newTrack);
        }
        case 'SET_FRAME_LABEL': {
            const { key, frame, label } = payload;

            const newTrack = setLabel(getTrack(task, key), frame, label);
            return setTrack(task, key, newTrack);
        }
        case 'TOGGLE_VISIBLE': {
            const { key } = payload;

            const newTrack = toggleVisible(getTrack(task, key));
            return setTrack(task, key, newTrack);
        }
        case 'SET_SELECTED': {
            const { key } = payload;
            return setSelected(task, key);
        }
        case 'SET_TOTAL_FRAME_COUNT': {
            const { totalFrames } = payload;
            return setTotalFrames(task, totalFrames);
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
