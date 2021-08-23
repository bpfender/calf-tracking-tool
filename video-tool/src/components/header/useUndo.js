//https://redux.js.org/usage/implementing-undo-history

import { useReducer, useRef } from "react";

export function useUndo(initialState) {
    const [state, stateDispatch] = useReducer(stateReducer, defaultHistory(initialState));

    const undo = () => {
        stateDispatch({
            type: 'UNDO'
        });
    };

    const redo = () => {
        stateDispatch({
            type: 'REDO'
        });
    };

    const set = (value) => {
        if (value !== state.current) {
            stateDispatch({
                type: 'SET',
                payload: value,
            });
        } else {
            console.log("IGNORE");
        }

    };

    const canUndo = () => state.undoStack.length > 0;

    const canRedo = () => state.redoStack.length > 0;

    return {
        current: state.current,
        undo: undo,
        redo: redo,
        set: set,
        canUndo: canUndo,
        canRedo: canRedo,
    };
}

const defaultHistory = (initialState) => {
    return {
        undoStack: [],
        current: initialState,
        redoStack: [],
    };
};

function stateReducer(state, action) {
    const { undoStack, current, redoStack } = state;
    console.log(undoStack);
    switch (action.type) {
        case 'UNDO':
            const previous = undoStack.pop();
            redoStack.push(current)
            return {
                undoStack: undoStack,
                current: previous,
                redoStack: redoStack,
            };
        case 'REDO':
            const next = redoStack.pop();
            undoStack.push(current)
            return {
                undoStack: undoStack,
                current: next,
                redoStack: redoStack
            };
        case 'SET':
            undoStack.push(current)
            return {
                undoStack: undoStack,
                current: action.payload,
                redoStack: [],
            };
        default:
            throw new Error("Unknown state case");
    }
}