import { Button, Card, Classes, FormGroup, Icon, InputGroup, Overlay } from '@blueprintjs/core';
import React, { useState } from 'react';
import { Project } from '../annotations/Project';
import { createNewProjectHandle, verifyPermission } from '../storage/file-access';
import "./Overlay.scss"

export function NewProjectOverlay(props) {
    const defaultWarning = { intent: "none", label: "" };
    const { open, setOpen, dirHandle } = props;
    const [input, setInput] = useState("");
    const [warning, setWarning] = useState(defaultWarning)

    const handleConfirm = async () => {
        try {
            if (!input || /^\s*$/.test(input)) {
                setWarning({
                    intent: "warning",
                    label: "Please enter a valid project name..."
                });
                throw new Error("Invalid project filename.");
            }

            if (await verifyPermission(dirHandle)) {
                for await (const entry of dirHandle.keys()) {
                    //FIXME not sure how complete this regex is
                    if (entry.replace(/\.[^/.]+$/, "") === input) {
                        setWarning({
                            intent: "warning",
                            label: "This project name already exists."
                        });
                        return;
                    }
                }
                const projectHandle = await createNewProjectHandle(dirHandle, input);
                const project = new Project(input, projectHandle)

                setOpen(false);

            } else {
                setWarning({
                    intent: "warning",
                    label: "Permission required to create project",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setWarning(defaultWarning);
        setOpen(false);
    }

    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card className="overlay">
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
                            onFocus={() => { setWarning({ intent: "none", label: warning.label }) }}
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