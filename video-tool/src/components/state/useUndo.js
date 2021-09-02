//https://redux.js.org/usage/implementing-undo-history

import { useReducer } from "react";

export function useUndo(reducer, initialState) {
    const [state, dispatch] = useReducer(historyReducer(reducer), defaultHistory(initialState));

    const canUndo = state.undos.length > 0;
    const canRedo = state.redos.length > 0;

    return [state, dispatch, canUndo, canRedo];
}

function defaultHistory(initialState) {
    return {
        undos: [],
        current: initialState,
        redos: [],
    };
}

function historyReducer(reducer) {
    return function (state, action) {
        const { undos, current, redos } = state;

        switch (action.type) {
            case 'UNDO': {
                const prev = undos[undos.length - 1];
                const newUndos = undos.slice(0, undos.length - 1);
                return {
                    undos: newUndos,
                    current: prev,
                    redos: [current, ...redos],
                };
            }
            case 'REDO': {
                const next = redos[0];
                const newRedos = redos.slice(1);

                return {
                    undos: [...undos, current],
                    current: next,
                    redos: newRedos,
                };
            }
            case 'RESET_HISTORY': {
                return {
                    undos: [],
                    current: current,
                    redos: [],
                };
            }
            default: {
                const newCurrent = reducer(current, action);

                if (newCurrent === current) {
                    return state;
                }

                return {
                    undos: [...undos, current],
                    current: newCurrent,
                    redos: [],
                };
            }
        }
    }
}

