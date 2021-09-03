import { Button, Card, Classes, FormGroup, Icon, InputGroup, Overlay } from '@blueprintjs/core';
import React, { useState } from 'react';
import { createNewProjectHandle, verifyPermission } from '../storage/file-access';
import { retrieveAppDirHandle, storeRecentProjectHandle } from '../storage/indexedDB';
import "./Overlay.scss"

export function NewProjectOverlay(props) {
    const { open, setOpen, playerDispatch, projectDispatch } = props;

    const defaultWarning = { intent: "none", label: "" };

    const [input, setInput] = useState("");
    const [warning, setWarning] = useState(defaultWarning)

    const handleConfirm = async () => {
        try {
            if (!input || /^\s*$/.test(input)) {
                throw new Error("Please enter a valid project name.");
            }

            const dirHandle = await retrieveAppDirHandle()

            if (!(await verifyPermission(dirHandle))) {
                throw new Error("Permission required to create project.");
            }

            for await (const entry of dirHandle.keys()) {
                //FIXME not sure how complete this regex is
                if (entry.replace(/\.[^/.]+$/, "") === input) {
                    throw new Error("This project name already exists.");
                }
            }

            const projectHandle = await createNewProjectHandle(dirHandle, input);

            storeRecentProjectHandle(projectHandle);

            projectDispatch({
                type: 'NEW_PROJECT',
                payload: {
                    name: input,
                    fileHandle: projectHandle
                }
            });

            playerDispatch({ type: 'RESET' });

            setOpen(false);
        } catch (error) {
            // QUESTION should errors be reserved for more "important things"?
            setWarning({
                intent: "warning",
                label: error.message,
            });
        }
    };

    const handleCancel = () => {
        setWarning(defaultWarning);
        setOpen(false);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleConfirm()
        }
    }


    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            onClosed={() => { setInput("") }}
            isOpen={open}>
            <Card
                className="overlay"
                onKeyDown={handleKeyDown}>
                <Icon
                    className="overlay-icon"
                    icon="document"
                />
                <div className="overlay-content">
                    <h5
                        className={Classes.HEADING}
                    >New Project</h5>
                    <p>Enter and confirm your project name and then select where you want to save it.</p>
                    <p>We recommend keeping all your project files in one folder.</p>
                    <FormGroup
                        helperText={warning.label}
                        intent={warning.intent}>
                        <InputGroup
                            intent={warning.intent}
                            className="overlay-input"
                            placeholder="Enter your project name..."
                            onFocus={() => { setWarning(defaultWarning) }}
                            onChange={(event) => { setInput(event.target.value) }}>
                        </InputGroup>
                    </FormGroup>
                    <div className="overlay-buttons-right">
                        <Button
                            className="overlay-buttons-space"
                            icon="cross"
                            onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            icon="tick"
                            intent="primary"
                            onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Card >
        </Overlay >
    )
}
/*
<Alert
className="bp3-dark"
isOpen={true}
intent="primary"
cancelButtonText="Cancel"
confirmButtonText="Confirm">

<h4 className={Classes.HEADING}>
    New project
</h4>
<p>
    Enter and confirm your project name and then select where you want to save it.
</p>
<InputGroup
    leftIcon="document"
    placeholder="Enter your project name..."
    onChange={(event) => { setInput(event.target.value) }}>
</InputGroup>
</Alert >*/