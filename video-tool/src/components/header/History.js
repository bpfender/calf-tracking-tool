import { Button, ButtonGroup } from '@blueprintjs/core';
import React, { useEffect, useRef } from 'react';
import { usePrevious } from './usePrevious';

export function History(props) {
    const { project, projectDispatch } = props;

    const history = useRef({ undoStack: [], redoStack: [] });
    const update = useRef(true);

    const prevState = usePrevious(project);

    useEffect(() => {
        if (prevState && update.current) {
            history.current.undoStack.push(prevState)
            history.current.redoState = [];
        }
        update.current = true;
    }, [prevState]);

    const handleUndo = () => {
        update.current = false;
        history.current.redoStack.push(project);
        const newState = history.current.undoStack.pop();

        projectDispatch({
            type: 'UNDO_REDO',
            payload: { project: newState },
        });
    };

    const handleRedo = () => {
        update.current = false;
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