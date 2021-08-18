import { addLabel, addTask, initialiseProject, removeLabel, setSelectedKey, updateTask } from "../annotations/ProjectFactory";

export function projectReducer(state, action) {
    console.log("PROJECT: ", action.type);
    const payload = action.payload;
    switch (action.type) {
        case 'NEW_PROJECT':
            {
                return state.initialiseProject(payload.fileHandle)
                //return initialiseProject(state, payload.fileHandle);
            }
        case 'LOAD_PROJECT':
            {
                return payload.project;
            }
        case 'ADD_TASK':
            {
                return state.addTask(payload.videoHandle);
                //return addTask(state, payload.videoHandle, payload.videoName);
            }
        case 'REMOVE_TASK':
            {
                return state.deleteTask(payload.key);
            }
        case 'UPDATE_TASK':
            {
                return updateTask(state, payload.task);
            }
        case 'SET_SELECTED_TASK':
            {
                return state.setSelectedTask(payload.key);
                //return setSelectedKey(state, payload.key);
            }
        case 'ADD_TAG':
            {
                return state.addLabel(payload.label);
                //return addLabel(state, payload.label);
            }
        case 'REMOVE_TAG':
            {
                return state.deleteLabel(payload.label);
                //return removeLabel(state, payload.label);
            }
        default:
            throw new Error(`Unexpected project reducer case ${action.type}`);
    }
}