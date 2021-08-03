import { Alert, Button, Callout, Card, Classes, FormGroup, Icon, InputGroup, Overlay } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import "./Overlay.scss"

export function NewProjectOverlay(props) {
    const [open, setOpen] = useState(true);
    const [input, setInput] = useState("");


    const handleConfirm = () => { };

    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card className="overlay">
                <Icon
                    className="overlay-icon"
                    icon="document" />
                <div className="overlay-content">
                    <h5 className={Classes.HEADING}>New project...</h5>
                    <p>Enter and confirm your project name and then select where you want to save it.</p>
                    <InputGroup
                        className="overlay-input"
                        placeholder="Enter your project name..."
                        onChange={(event) => { setInput(event.target.value) }}>
                    </InputGroup>
                    <div className="overlay-buttons-right">
                        <Button
                            className="overlay-buttons-space"
                            icon="cross"
                            onClick={() => { setOpen(false) }}>
                            Cancel
                        </Button>
                        <Button
                            icon="tick"
                            intent="primary"
                            onClick={handleConfirm}>
                            Create
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