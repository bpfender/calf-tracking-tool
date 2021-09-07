
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
            console.log(payload.label);
            return state.setLabel(payload.frame, payload.label);
        }
        case 'CUT_LABEL': {
            return state.cutLabel(payload.frame);
        }
        case 'INSERT_LABEL': {
            return state.insertLabel(payload.frame);
        }
        case 'SET_ANCHOR': {
            return state.setAnchor(payload.frame);
        }
        case 'UNSET_ANCHOR': {
            return state.unsetAnchor(payload.frame);
        }
        default:
            throw new Error("Unrecognised project action");
    }
}