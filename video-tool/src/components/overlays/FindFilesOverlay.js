import { Button, Callout, Card, Classes, Icon, Menu, MenuDivider, MenuItem, Overlay, Spinner, Tag } from '@blueprintjs/core';
import React from 'react';

export function FindFilesOverlay(props) {
    const { open } = props;

    return (
        <Overlay
            className="bp3-dark"
            canEscapeKeyClose={false}
            canOutsideClickClose={false}
            isOpen={open}>
            <Card className="overlay">
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
                        <MenuItem
                            intent="primary"
                            text="../VAT/videos/Video 1"
                            icon={<Spinner className="overlay-spinner" intent="primary" size={16} />}
                            label="Loading..." />

                        <MenuItem
                            intent="danger"
                            text="../VAT/videos/Video 2"
                            icon="warning-sign"
                            label="Click to find video." />

                        <MenuItem
                            active={true}
                            intent="success"
                            text="../VAT/videos/Video 3"
                            icon="video"
                            label="Done." />
                        <MenuDivider />
                    </Menu>

                    <div className="overlay-buttons-right">
                        <Button
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