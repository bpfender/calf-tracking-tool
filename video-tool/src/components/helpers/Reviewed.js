import { Button, ButtonGroup } from '@blueprintjs/core';
import React from 'react';
import { HelperPanel } from './HelperPanel';

export function Reviewed(props) {
    const { reviewed, currentFrame, paused, videoRef, framerate } = props;

    const content =
        <div>
            <ButtonGroup
                large={true}>
                <Button
                    icon="tick"
                    intent="success"
                    text="Confirm annotations"
                    outlined={true} />

                <Button
                    icon="cross"
                    intent="danger"
                    text="Reject annotations"
                    outlined={true} />
            </ButtonGroup>
        </div>

    return (
        <HelperPanel
            type="Reviewed"
            description={<text>reviewed</text>}
            content={content}
            frameList={reviewed}
            currentFrame={currentFrame}
            paused={paused}
            videoRef={videoRef}
            framerate={framerate} />
    );
}