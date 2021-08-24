import { Button, ButtonGroup, Classes, Spinner } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { getNextReviewed, getPrevReviewed } from '../annotations/TaskFactory';

//FIXME spinner not centred properly
export function VideoBar(props) {
    const { src,
        filename,
        framerate,
        videoWidth,
        videoHeight,
        projectDispatch,
        currentFrame,
        isReviewed } = props;

    const setVideoInfo = () => {
        if (!src) {
            return;
        } else if (!framerate || !videoHeight || !videoWidth) {
            return <Spinner className="center" size={20} />
        } else {
            return <text className="center">{framerate} fps | {videoWidth} x {videoHeight}</text>
        }
    }

    const handleConfirm = () => {
        projectDispatch({
            type: 'CONFIRM_FRAME',
            payload: { frame: currentFrame }
        })
    };

    const handleReject = () => {
        projectDispatch({
            type: 'REJECT_FRAME',
            payload: { frame: currentFrame }
        });
    };

    return (
        <div className="video-bar">
            <text>{filename}</text>
            <div className="video-bar-key-info">
                {setVideoInfo()}
            </div>
            <ButtonGroup
                className="video-bar-review-buttons"
                minimal={true}>
                <Button
                    icon="tick"
                    intent="success"
                    active={isReviewed}
                    onClick={handleConfirm} />
                <Button
                    icon="cross"
                    intent="warning"
                    onClick={handleReject} />
            </ButtonGroup >
        </ div >
    );
}