
export function trackReducer(state, action) {
    const payload = action.payload;

    switch (action.type) {
        case 'SET_TRACK_NAME': {
            return state.setName(payload.name);
        }
        case 'SET_TRACK_COLOUR': {
            return state.setColour(payload.colour);
        }
        case 'TOGGLE_VISIBLE': {
            return state.toggleVisible();
        }
        case 'SET_FRAME_LABEL': {
            return state.setLabel(payload.frame, payload.label);
        }
        default:
            throw new Error("Unrecognised project action");
    }
}