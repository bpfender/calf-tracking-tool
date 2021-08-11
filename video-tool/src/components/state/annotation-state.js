import { addTrack, deleteTrack, getTrack, setSelected, setTotalFrames, setTrack, setVideoHandle, TaskFactory } from "../annotations/TaskFactory";
import { setColour, setLabel, setName, toggleVisible } from "../annotations/TrackFactory";

export function annotationReducer(state, action) {
    const payload = action.payload;

    console.log("TASK: ", action.type);

    switch (action.type) {
        case 'NEW_TASK': {
            return TaskFactory(payload.totalFrames, payload.videoHandle)
        }
        case 'LOAD_TASK': {
            return payload.task;
        }
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

            const newTrack = setName(getTrack(state, key), name);
            return setTrack(state, key, newTrack);
        }
        case 'SET_TRACK_COLOUR': {
            const { key, colour } = payload;

            const newTrack = setColour(getTrack(state, key), colour);
            return setTrack(state, key, newTrack);
        }
        case 'SET_FRAME_LABEL': {
            const { key, frame, label } = payload;

            const newTrack = setLabel(getTrack(state, key), frame, label);
            return setTrack(state, key, newTrack);
        }
        case 'TOGGLE_VISIBLE': {
            const { key } = payload;

            const newTrack = toggleVisible(getTrack(state, key));
            return setTrack(state, key, newTrack);
        }
        case 'SET_SELECTED': {
            const { key } = payload;
            return setSelected(state, key);
        }
        case 'SET_TOTAL_FRAME_COUNT': {
            const { totalFrames } = payload;
            return setTotalFrames(state, totalFrames);
        }
        case 'SET_VIDEO': {
            const { handle } = payload;
            return setVideoHandle(state, handle);
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
