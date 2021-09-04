import { Button, Card, Classes, Icon, Overlay } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import "./Overlay.scss";

export function StartupOverlay(props) {
    const { handleNewProject, handleOpenProject, project, open, setOpen } = props;

    // When project is initialised, this can be closed
    useEffect(() => {
        if (project.fileHandle) {
            setOpen(false);
        }
    }, [project.fileHandle, setOpen])

    const handleNew = async () => {
        await handleNewProject();
    };

    const handleOpen = async () => {
        await handleOpenProject();
    };

    const openExistingOverlay = (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card
                className="overlay">
                <Icon
                    className="overlay-icon"
                    icon="folder-new"
                />
                <div className="overlay-content">
                    <h5 className={Classes.HEADING}>Welcome to VAT</h5>
                    <p>Please open an existing project or create a new one</p>

                    <div className="overlay-buttons-right">
                        <Button
                            className="overlay-buttons-space"
                            icon="folder-open"
                            onClick={handleOpen}>
                            Open
                        </Button>
                        <Button
                            icon="folder-new"
                            intent="primary"
                            onClick={handleNew}>
                            New
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
            isOpen={open}>
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
                            icon="folder-new"
                            onClick={handleNew}>
                            New project
                        </Button>
                        <Button
                            icon="repeat"
                            intent="primary"
                            onClick>
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

