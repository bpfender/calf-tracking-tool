import { Button, Card, Classes, Icon, Overlay } from '@blueprintjs/core';
import React from 'react';
import "./Overlay.scss";

export function StartupOverlay(props) {
    const handleConfirm = () => {

    };

    const newProjectOverlay = (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={true}>
            <Card className="overlay">
                <Icon
                    className="overlay-icon"
                    icon="folder-new"
                />
                <div className="overlay-content">
                    <h5
                        className={Classes.HEADING}
                    >Welcome to VAT!</h5>
                    <p>Please create a new project to get started</p>
                    <div className="overlay-buttons-right">
                        <Button
                            icon="tick"
                            intent="success"
                            onClick={handleConfirm}>
                            Continue
                        </Button>
                    </div>
                </div>
            </Card >
        </Overlay >
    );

    const openExistingOverlay = (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={true}>
            <Card className="overlay">
                <Icon
                    className="overlay-icon"
                    icon="folder-new"
                />
                <div className="overlay-content">
                    <h5
                        className={Classes.HEADING}
                    >Welcome to VAT!</h5>
                    <p>Please open an existing project or create a new one</p>
                    <div className="overlay-buttons-right">
                        <Button
                            className="overlay-buttons-space"
                            icon="folder-open">
                            Open existing
                        </Button>
                        <Button
                            icon="folder-new"
                            intent="primary"
                            onClick={handleConfirm}>
                            New project
                        </Button>
                    </div>
                </div>
            </Card >
        </Overlay >
    );

    const recoverOverlay = (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={true}>
            <Card className="overlay">
                <Icon
                    className="overlay-icon"
                    icon="folder-new"
                />
                <div className="overlay-content">
                    <h5
                        className={Classes.HEADING}
                    >Welcome to VAT!</h5>
                    <p>Recovered an unsaved file. Do you want to save it or open a new project?</p>
                    <div className="overlay-buttons-right">

                        <Button
                            className="overlay-buttons-space"
                            icon="folder-new">
                            New project
                        </Button>
                        <Button
                            icon="repeat"
                            intent="primary"
                            onClick={handleConfirm}>
                            Recover
                        </Button>
                    </div>
                </div>
            </Card >
        </Overlay >
    );

    return (
        [openExistingOverlay]
    );
}

