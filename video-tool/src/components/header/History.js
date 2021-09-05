import { Button, ButtonGroup } from '@blueprintjs/core';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { usePrevious } from './usePrevious';


export function History(props) {
    const { project, projectDispatch, canUndo, canRedo } = props;


    const handleUndo = () => {
        projectDispatch({
            type: 'UNDO',
        });
    };

    const handleRedo = () => {
        projectDispatch({
            type: 'REDO',
        });
    };

    return (
        <ButtonGroup
            minimal={true}
            className="header-history">
            <Button
                icon="undo"
                disabled={!canUndo}
                onClick={handleUndo} />
            <Button
                icon="redo"
                disabled={!canRedo}
                onClick={handleRedo} />
        </ButtonGroup>
    );
}