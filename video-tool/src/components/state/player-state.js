export const defaultPlayerState = {
    // requestVideoFrameCallback() metadata
    vsync: 0,
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
    framerate: 0,
    currentFrame: 0,
    totalFrames: 0,
    framesToSkip: 5,
    timeToSkip: 1,
};

export function playerReducer(state, action) {
    const payload = action.payload;
    // console.log(action.type, payload);

    switch (action.type) {
        case 'FRAME_CALLBACK':
            return {
                ...state,
                vsync: payload.vsync,
                currentFrame: payload.currentFrame,
                presentationTime: payload.presentationTime,
                expectedDisplayTime: payload.expectedDisplayTime,
                mediaTime: payload.mediaTime,
                presentedFrames: payload.presentedFrames,
                processingDuration: payload.processingDuration
            };
        case 'ABORT':
            return state;
        case 'CAN_PLAY':
            return {
                ...state,
                readyState: payload.readyState
            };
        case 'CAN_PLAY_THROUGH':
            return {
                ...state,
                readyState: payload.readyState
            };
        case 'DURATION_CHANGE':
            return {
                ...state,
                duration: payload.duration,
            };
        case 'EMPTIED':
            return state;
        case 'ENDED':
            return {
                ...state,
                ended: true,
            };
        case 'ERROR':
            return {
                ...state,
                error: payload.error,
            };
        case 'LOADED_DATA':
            return {
                ...state,
                readyState: payload.readyState,
            };
        case 'LOADED_METADATA':
            return {
                ...state,
                readyState: payload.readyState,
                videoWidth: payload.videoWidth,
                videoHeight: payload.videoHeight,
            };
        case 'LOAD_START':
            return {
                ...state,
                readyState: payload.readyState
            };
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
            return {
                ...state,
                paused: false,
            };
        case 'PROGRESS':
            return {
                ...state
            };
        case 'RATE_CHANGE':
            return {
                ...state,
                playbackRate: payload.playbackRate,
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
            return {
                ...state
            };
        case 'SUSPEND':
            return {
                ...state
            };
        case 'TIME_UPDATE':
            return {
                ...state
            };
        case 'WAITING':
            return {
                ...state
            };
        case 'FRAMES_TO_SKIP':
            return {
                ...state,
                framesToSkip: payload.framesToSkip,
            };
        case 'TIME_TO_SKIP':
            return {
                ...state,
                timeToSkip: payload.timeToSkip,
            };
        case 'SRC_CHANGE':
            return {
                ...state,
                framerate: 0,
                src: payload.src,
            };
        case 'SET_FRAMERATE':
            return {
                ...state,
                framerate: payload.framerate,
                totalFrames: Math.floor(state.duration * payload.framerate + 1)
            }
        case 'RESET':
            return defaultPlayerState;

        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}

