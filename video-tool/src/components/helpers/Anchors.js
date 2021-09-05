import { Button, H5, Icon } from '@blueprintjs/core';
import { List } from 'immutable';
import React from 'react';
import { HelperPanel } from './HelperPanel';

export function Anchors(props) {
    const {
        projectDispatch,
        track,
        trackKey,
        currentFrame,
        paused,
        videoRef,
        framerate } = props;

    const handleSetAnchor = () => {
        console.log(trackKey);

        projectDispatch({
            type: 'SET_ANCHOR',
            payload: {
                key: trackKey,
                frame: currentFrame
            }
        }
        );
    };

    const description =
        <div>
            <H5>Anchors are frames that have been labelled manually or confirmed for a
                specific track.</H5>
            <p>Anchor frames are interpolated between to generate annotations for each track.
                Use this panel to identify anchor frames, set/unset them and navigate between them.
            </p>
        </div>


    const content =
        <div>
            <Button
                disabled={!track}
                icon={<Icon
                    icon="paperclip"
                    color={track ? track.colour : null} />
                }
                text="Set anchor"
                outlined={true}
                onClick={handleSetAnchor} />
        </div>

    return (
        <HelperPanel
            type="Anchor"
            description={description}
            content={content}
            frameList={track ? track.anchors : List()}
            currentFrame={currentFrame}
            paused={paused}
            videoRef={videoRef}
            framerate={framerate} />
    );

}