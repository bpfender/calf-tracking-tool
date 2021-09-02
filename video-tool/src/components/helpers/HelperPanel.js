import { Button, ButtonGroup, Callout, Card, H3, H4, H5 } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { seekFrame } from '../video/video-functions';

export function HelperPanel(props) {
    const { type, description, content, frameList, currentFrame, paused, videoRef, framerate } = props;

    const [frameListLength, setFrameListLength] = useState(frameList.size);

    const getIndex = () => {
        return frameList.indexOf(currentFrame);
    };

    const getNextFrame = () => {
        return frameList.find(val => val > currentFrame, this, -1);
    };

    const getPrevFrame = () => {
        return frameList.findLast(val => val < currentFrame, this, -1);
    };

    useEffect(() => {
        setFrameListLength(frameList.size);
    }, [frameList]);

    const handlePrevClick = () => {
        const prev = getPrevFrame();
        if (prev >= 0) {
            seekFrame(videoRef.current, prev, framerate);
        }
    };

    const handleNextClick = () => {
        const next = getNextFrame();
        if (next >= 0) {
            seekFrame(videoRef.current, next, framerate)
        }
    };

    const formatKeyframeNumber = () => {
        const i = getIndex();
        const length = frameListLength ? frameListLength.toString() : "-";

        if (!paused || i < 0) {
            return `- / ${length}`;
        } else {
            return `${i + 1} / ${frameListLength}`;
        }
    }

    const formatPrevFrame = () => {
        const prev = getPrevFrame();
        if (!paused || prev < 0) {
            return "-";
        } else {
            return `${prev} (-${currentFrame - prev})`;
        }
    };

    const formatNextFrame = () => {
        const next = getNextFrame();
        if (!paused || next < 0) {
            return "-";
        } else {
            return `${next} (+${next - currentFrame})`;
        }
    };

    return (
        <Card className="helper-panel">
            <div className="helper-panel-top-left">
                {description}
            </div>
            <div className="helper-panel-bottom-left">
                {content}
            </div>

            <div className="helper-panel-top-right">
                <Callout className="helper-panel-frame-count">
                    <H4>{`${type}: ${formatKeyframeNumber()}`}</H4>
                </Callout>
            </div>
            <div className="helper-panel-bottom-right">
                <ButtonGroup
                    className="helper-panel-next-prev"
                    large={true}>
                    <Button
                        className="helper-panel-frame-info"
                        onClick={handlePrevClick}
                        intent="primary"
                        outlined={true}
                        text={`Prev ${type.toLowerCase()}: ${formatPrevFrame()}`} />
                    <Button
                        className="helper-panel-frame-info"
                        onClick={handleNextClick}
                        intent="primary"
                        outlined={true}
                        text={`Next ${type.toLowerCase()}: ${formatNextFrame()}`} />
                </ButtonGroup>
            </div>
        </Card>
    );
}