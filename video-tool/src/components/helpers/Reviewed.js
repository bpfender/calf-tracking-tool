import { Button, ButtonGroup, H5 } from '@blueprintjs/core';
import React from 'react';
import { HelperPanel } from './HelperPanel';

export function Reviewed(props) {
    const { reviewed, currentFrame, paused, videoRef, framerate, projectDispatch } = props;

    const handleConfirm = () => {
        projectDispatch({
            type: 'CONFIRM_FRAME',
            payload: { frame: currentFrame },
        });
    };

    const handleReject = () => {
        projectDispatch({
            type: 'REJECT_FRAME',
            payload: { frame: currentFrame },
        });
    };

    const description =
        <div>
            <H5>Reviewed frames have been confirmed as correct. </H5>
            <p>Use this panel to look through your reviewed frames.</p>
        </div>

    const content =
        <div>
            <ButtonGroup>
                <Button
                    icon="tick"
                    intent="success"
                    text="Confirm annotations"
                    active={reviewed.includes(currentFrame)}
                    disabled={framerate ? false : true}
                    outlined={true}
                    onClick={handleConfirm} />
                <Button
                    className="helper-reviewed-button"
                    icon="cross"
                    intent="danger"
                    text="Reject annotations"
                    active={!reviewed.includes(currentFrame)}
                    disabled={framerate ? false : true}
                    outlined={true}
                    onClick={handleReject} />
            </ButtonGroup>
        </div>

    return (
        <HelperPanel
            type="Reviewed"
            description={description}
            content={content}
            frameList={reviewed}
            currentFrame={currentFrame}
            paused={paused}
            videoRef={videoRef}
            framerate={framerate} />
    );
}