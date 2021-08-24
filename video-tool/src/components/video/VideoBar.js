import { Button, ButtonGroup, Icon, Spinner } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';

export function VideoBar(props) {
    const { src,
        filename,
        framerate,
        videoWidth,
        videoHeight,
        projectDispatch,
        currentFrame,
        isReviewed,
        isKeyframe,
        isAnchor } = props;

    const setVideoInfo = () => {
        if (!src) {
            return;
        } else if (!framerate || !videoHeight || !videoWidth) {
            return <Spinner className="center" size={20} />
        } else {
            return <text className="center">{framerate} fps | {videoWidth} x {videoHeight}</text>
        }
    }

    const formatTitle = () => {
        const title = [<text>{filename}</text>];

        if (isKeyframe) {
            title.push(
                <Icon
                    className="video-bar-icon"
                    icon="key" />
            );
        }

        if (isAnchor) {
            title.push(
                <Icon
                    className="video-bar-icon"
                    icon="paperclip"
                    color={isAnchor} />
            );
        }
        console.log(isKeyframe, isAnchor);
        return title
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
            <div className="video-bar-title">
                {formatTitle()}
            </div>
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