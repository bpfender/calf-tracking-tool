import { Button, Card, Classes, Icon, Menu, MenuDivider, MenuItem, Overlay, Spinner, Tag } from '@blueprintjs/core';
import React from 'react';
import { fileAlreadyInFolder, fileExists, getVideoHandle } from '../storage/file-access';
import { retrieveAppDirHandle, retrieveVideoDirHandle } from '../storage/indexedDB';



export function FindFilesOverlay(props) {
    const { open } = props;

    const menuItemState = {
        _directoryPath: "../VAT Projects/videos/",
        notFound: function (text) {
            return (<MenuItem
                intent="danger"
                text={this._directoryPath + text}
                icon="warning-sign"
                label="Click to find video."
                onClick={handleClick} />);
        },
        loading: function (text) {
            return (<MenuItem
                intent="primary"
                text={this._directoryPath + text}
                icon={<Spinner
                    className="overlay-spinner"
                    intent="primary"
                    size={16} />}
                label="Loading..."
                onClick={handleClick} />);
        },
        success: function (text) {
            return (<MenuItem
                active={true}
                intent="success"
                text={this._directoryPath + text}
                icon="video"
                label="Done."
                onClick={handleClick} />);
        },
    };

    const handleClick = async () => {
        const appDirHandle = await retrieveAppDirHandle();
        const videoDirHandle = await retrieveVideoDirHandle();

        const videoHandle = await getVideoHandle(appDirHandle);
        const video = await videoHandle.getFile();


    }

    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card className="overlay files">
                <Icon
                    className="overlay-icon"
                    icon="error"
                />
                <div className="overlay-content">
                    <h5
                        className={Classes.HEADING}
                    >Can't find video files</h5>

                    <Menu>
                        <MenuDivider />
                        {menuItemState.loading("video 1")}
                        {menuItemState.success("video 2")}
                        {menuItemState.notFound("video 3")}
                        <MenuDivider />
                    </Menu>

                    <div className="overlay-buttons-right">
                        <Button
                            disabled={true}
                            icon="tick"
                            intent="primary"
                            onClick>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Card >
        </Overlay >
    );
}