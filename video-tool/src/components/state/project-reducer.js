import { addLabel, addTask, initialiseProject, setSelectedKey, updateTask } from "../annotations/ProjectFactory";

export function projectReducer(state, action) {
    console.log("PROJECT: ", action.type);
    const payload = action.payload;
    switch (action.type) {
        case 'NEW_PROJECT':
            {
                return initialiseProject(state, payload.fileHandle);
            }
        case 'LOAD_PROJECT':
            {
                return;
            }
        case 'ADD_TASK':
            {
                return addTask(state, payload.videoHandle, payload.videoName);
            }
        case 'UPDATE_TASK':
            {
                return updateTask(state, payload.task);
            }
        case 'SET_SELECTED_TASK':
            {
                return setSelectedKey(state, payload.key);
            }
        case 'ADD_LABEL':
            {
                return addLabel(state, payload.label);
            }
        default:
            throw new Error(`Unexpected project reducer case ${action.type}`);
    }
}