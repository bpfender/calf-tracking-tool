import { Button, ButtonGroup, Icon, Spinner } from '@blueprintjs/core';
import React from 'react';

export function VideoBar(props) {
    const { framerate, videoWidth, videoHeight } = props;


    const spinner = (bool) => {
        if (bool) {
            return <Spinner size={20} />
        } else {
            return <p>{videoWidth}x{videoHeight}</p>
        }
    }

    return (
        <div className="video-bar bp3-text-small">
            <p>VIDEO NAME</p>
            <div className="video-bar-key-info">
                {spinner(!videoWidth || !videoHeight)}
            </div>
            <ButtonGroup
                className="video-bar-review-buttons"
                minimal={true}>
                <Button
                    icon="tick"
                    intent="success" />
                <Button
                    icon="cross"
                    intent="warning" />
            </ButtonGroup >
        </div >
    );
}