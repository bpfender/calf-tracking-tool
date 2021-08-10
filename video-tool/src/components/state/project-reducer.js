import { addLabel, addTask, setSelectedKey, updateTask } from "../annotations/ProjectFactory";

export function projectReducer(state, action) {
    const payload = action.payload;

    switch (action.type) {
        case 'ADD_TASK':
            {
                return addTask(state);
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
            throw new Error(`Unexpeted project reducer case ${action.type}`);
    }
}