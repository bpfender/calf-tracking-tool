import { Button, Card, Classes, Icon, Overlay } from '@blueprintjs/core';
import { set } from 'idb-keyval';
import React from 'react';
import { getParentDirectory } from '../storage/indexedDB';

import "./Overlay.scss"


// FIXME directory followed by new project not working currently
export function DirectoryOverlay(props) {
    const { open, setDirFlag, setProjectFlag } = props;

    // FIXME transition from directory to file window not clean
    const handleConfirm = async () => {
        try {
            const dirHandle = await getParentDirectory();
            await set('parentDir', dirHandle);
            setDirFlag(false);
            setProjectFlag(true);
        } catch (error) {
            // No error handling
        }
    };

    const handleCancel = () => {
        setDirFlag(false);
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
                            onClick={handleCancel}>
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