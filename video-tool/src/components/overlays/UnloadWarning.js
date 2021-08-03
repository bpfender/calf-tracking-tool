import { Button, Card, Classes, Icon, Overlay } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import "./Overlay.scss";

// TODO check beforeunload lifecycle https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
// TODO only activate listener if unsaved   
export function UnloadWarning(props) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser)

        return (() => {
            window.removeEventListener("beforeunload", alertUser);
        })
    }, []);

    const alertUser = (event) => {
        event.preventDefault();
        event.stopPropagation();

    };

    const handleExit = () => {

    }

    const handleSave = () => {

    }

    const handleCancel = () => {

    }

    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card className="warning-overlay">
                <Icon
                    className="warning-overlay-icon"
                    icon="warning-sign" />
                <div className="warning-overlay-content">
                    <h5 className={Classes.HEADING}>You have unsaved progress...</h5>
                    <p>Are you sure you want to exit without saving?</p>
                    <div className="warning-buttons">
                        <Button
                            icon="log-out"
                            intent="danger"
                            onClick={handleExit}>
                            Exit
                        </Button>
                        <div className="warning-buttons-grouped">
                            <Button
                                className="warning-button-space"
                                icon="floppy-disk"
                                intent="success"
                                onClick={handleSave}>
                                Save and exit
                            </Button>
                            <Button
                                icon="cross"
                                intent="none"
                                onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Card >
        </Overlay >
    );
}