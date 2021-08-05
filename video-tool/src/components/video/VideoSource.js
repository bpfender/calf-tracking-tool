import { Colors, Icon } from '@blueprintjs/core';

import React from 'react';

export default function VideoSource() {

    const handleDrop = () => {

    };

    const handleDragOver = () => {


    };


    return (
        <div
            className="video-container player-video-source-content"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <Icon
                className="player-video-source-icon"
                icon="add"
                iconSize={160}
            />
            <p>Add a video file to get started...</p>

        </div>
    );
}