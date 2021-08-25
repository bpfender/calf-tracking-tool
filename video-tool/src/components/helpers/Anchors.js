import { Button } from '@blueprintjs/core';
import React from 'react';
import { HelperPanel } from './HelperPanel';

export function Anchors(props) {
    const { anchors, currentFrame, paused, videoRef, framerate } = props;

    const content =
        <div>
            <Button
                icon="paperclip"
                text="Set anchor"
                large={true}
                outlined={true} />
        </div>

    return (
        <HelperPanel
            type="Anchor"
            description={<text>reviewed</text>}
            content={content}
            frameList={anchors}
            currentFrame={currentFrame}
            paused={paused}
            videoRef={videoRef}
            framerate={framerate} />
    );

}