import React from 'react';

const playerContext = React.createContext();

const defaultPlayerState = {
    // requestVideoFrameCallback() metadata
    presentationTime: 0,
    expectedDisplayTime: 0,
    mediaTime: 0,
    presentedFrames: 0,
    processingDuration: 0,

    // HTMLVideoElement properties
    buffered: null,
    currentSrc: null, // this is a  read only  property?
    currentTime: 0,
    duration: 0,
    ended: false,
    error: null,
    networkState: null,
    paused: true,
    playbackRate: 1,
    readyState: null,
    seekable: null,
    seeking: false,
    src: null,
    videoWidth: 0,
    videoHeight: 0,


}

function playerReducer(state, action) {
    switch (action.type) {
        case 'play':
        case 'pause':
        case 'rewind':
        case 'nextFrame':
        case 'prevFrame':
        case 'changeRate':
        case 'changeFrameSkip':
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}