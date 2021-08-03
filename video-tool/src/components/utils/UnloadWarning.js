import { Button, Card, Classes, H5, Icon, Overlay } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import "./UnloadWarning.scss";

// TODO check beforeunload lifecycle https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event

export function UnloadWarning(props) {

    useEffect(() => {
        window.addEventListener("beforeunload", handleUnload)

        return (() => {
            window.removeEventListener("beforeunload", handleUnload);
        })
    });

    const handleUnload = () => {

    };


    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={true}>
            <Card className="warning-overlay">
                <div className="warning-overlay-icon">
                    <Icon icon="warning-sign"></Icon>
                </div>
                <div className="warning-overlay-content">
                    <h5 className={Classes.HEADING}>You have unsaved progress...</h5>
                    <p>Are you sure you want to exit without saving?</p>
                    <div className="warning-buttons">

                        <Button
                            icon="log-out"
                            intent="danger">
                            Exit
                        </Button>

                        <div className="warning-buttons-grouped">
                            <Button
                                className="warning-button-space"
                                icon="floppy-disk"
                                intent="success">
                                Save and exit
                            </Button>
                            <Button
                                icon="cross"
                                intent="none">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Card >
        </Overlay >
    );
}