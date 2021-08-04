import { Button, Card, Classes, Icon, Overlay } from '@blueprintjs/core';
import React from 'react';
import { getParentDirectory } from '../storage/file-access';

import "./Overlay.scss"

export function DirectoryOverlay(props) {
    const { open, setOpen, setProject } = props;

    const handleConfirm = async () => {
        try {
            await getParentDirectory();
            setOpen(false);
            setProject(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card className="overlay">
                <Icon
                    className="overlay-icon"
                    icon="projects"
                />
                <div className="overlay-content">
                    <h5
                        className={Classes.HEADING}
                    >Choose VAT Directory</h5>
                    <p>Please create a new folder where your VAT projects will be stored.</p>
                    <p>If you have done this previously done this, please navigate to the folder.</p>
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
                            Continue
                        </Button>
                    </div>
                </div>
            </Card >
        </Overlay >


    )
}