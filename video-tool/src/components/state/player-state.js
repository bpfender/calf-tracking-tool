export const defaultPlayerState = {
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
    readyState: 0,
    seekable: null,
    seeking: false,
    src: null,
    videoWidth: 0,
    videoHeight: 0,

    // Extra states
    currentFrame: 0,
    seekingTime: 0,
    seekingFrame: 0,
    framesToSkip: 5,
    timeToSkip: 1,
};

export function playerReducer(state = defaultPlayerState, action) {

    switch (action.type) {
        case 'FRAME_CALLBACK':
            return {
                ...state,
                currentFrame: action.payload.currentFrame,
                presentationTime: action.payload.metadata.presentationTime,
                expectedDisplayTime: action.payload.metadata.expectedDisplayTime,
                mediaTime: action.payload.metadata.mediaTime,
                presentedFrames: action.payload.metadata.presentedFrames,
                processingDuration: action.payload.metadata.processingDuration,
            };
        case 'ABORT':
            return state;
        case 'CAN_PLAY':
        case 'CAN_PLAY_THROUGH':
        case 'DURATION_CHANGE':
        case 'EMPTIED':
        case 'ENDED':
            return {
                ...state,
                ended: true,
            };
        case 'ERROR':
            return {
                ...state,
                error: action.payload.error,
            };
        case 'LOADED_DATA':
            return {
                ...state,
                readyState: action.payload.readyState,
            };
        case 'LOADED_METADATA':
            return {
                ...state,
                readyState: action.payload.readyState,
            };
        case 'LOAD_START':
        case 'PAUSE':
            return {
                ...state,
                paused: true,
            };
        case 'PLAY':
            return {
                ...state,
                paused: false,
            };
        case 'PLAYING':
        case 'PROGRESS':
        case 'RATE_CHANGE':
            return {
                ...state,
                playbackRate: action.payload.playbackRate,
            };
        case 'SEEKED':
            return {
                ...state,
                seeking: false,
            };

        case 'SEEKING':
            return {
                ...state,
                seeking: true,
            };
        case 'STALLED':
        case 'SUSPEND':
        case 'TIME_UPDATE':
        case 'WAITING':
        case 'FRAMES_TO_SKIP':
            return {
                ...state,
                framesToSkip: action.payload.framesToSkip,
            };
        case 'TIME_TO_SKIP':
            return {
                ...state,
                timeToSkip: action.payload.timeToSkip,
            };
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
