export const defaultAnnotationState = {

}

export function annotationReducer(state, action) {
    const payload = action.payload;

    switch (action.type) {
        case 'ADD_TRACK':


            return {

            };
        case 'DELETE_TRACK':
            return {

            };
        case 'SET_TRACK_NAME':
            return {

            };
        case 'SET_TRACK_COLOUR':
            return {

            };
        case 'ADD_FRAME_ANNOTATION':
            return {

            };
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
