import { Button, ButtonGroup } from '@blueprintjs/core';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { usePrevious } from './usePrevious';
import { useUndo } from './useUndo';

export function History(props) {
    const { project, projectDispatch } = props;

    const history = useRef({ undoStack: [], redoStack: [] });
    const addToHistory = useRef(true);
    const prevState = usePrevious(project);

    useEffect(() => {
        if (prevState && addToHistory.current) {

            history.current.undoStack.push(prevState);
            history.current.redoStack = [];
        }

        addToHistory.current = true;
    }, [prevState]);


    const handleUndo = () => {
        addToHistory.current = false;

        history.current.redoStack.push(project);
        const newState = history.current.undoStack.pop();

        projectDispatch({
            type: 'UNDO_REDO',
            payload: { project: newState },
        });
    };

    const handleRedo = () => {
        addToHistory.current = false;


        history.current.undoStack.push(project);
        const newState = history.current.redoStack.pop();

        projectDispatch({
            type: 'UNDO_REDO',
            payload: { project: newState },
        });
    };

    return (
        <ButtonGroup
            minimal={true}>
            <Button
                icon="undo"
                disabled={history.current.undoStack.length === 0}
                onClick={handleUndo} />
            <Button
                icon="redo"
                disabled={history.current.redoStack.length === 0}
                onClick={handleRedo} />
        </ButtonGroup>
    );
}