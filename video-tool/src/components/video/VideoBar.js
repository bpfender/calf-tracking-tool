import { Button, ButtonGroup, Spinner } from '@blueprintjs/core';
import React from 'react';
import { HAVE_METADATA } from './video-constants';


//FIXME spinner not centred properly
export function VideoBar(props) {
    const { src,
        framerate,
        videoWidth,
        videoHeight } = props;

    const setVideoInfo = () => {
        if (!src) {
            return;
        } else if (!framerate || !videoHeight || !videoWidth) {
            return <Spinner size={20} />
        } else {
            return <text>{framerate} fps | {videoWidth} x {videoHeight}</text>
        }
    }

    return (
        <div className="video-bar bp3-text-small">
            <text>VIDEO NAME</text>
            <div className="video-bar-key-info">
                {setVideoInfo()}
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