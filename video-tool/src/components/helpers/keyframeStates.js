export const keyframeReadyState = {
    ready: 0,
    processing: 1,
    done: 2,
};

export const keyframeButtonStates = {
    waiting: {
        icon: "search",
        intent: "none",
        text: "Detect keyframes",
        disabled: true,
    },
    ready: {
        icon: "search",
        intent: "none",
        text: "Detect keyframes",
        disabled: false,
    },
    processing: function (remainingTime) {
        return {
            icon: "stopwatch",
            intent: "none",
            text: remainingTime,
            disabled: false,
        };
    },
    cancel: {
        icon: "cross",
        intent: "danger",
        text: "Cancel",
        disabled: false,
    },
    done: {
        icon: "tick",
        intent: "success",
        text: "Done",
        disabled: false,
    },
    reset: {
        icon: "reset",
        intent: "warning",
        text: "Recalculate",
        disabled: false,
    },
};

export const keyframeProgressStates = {
    ready: {
        animate: true,
        intent: "none",
        value: 0,
    },
    processing: function (progress) {
        return {
            animate: true,
            intent: "primary",
            value: progress,
        };
    },
    done: {
        animate: false,
        intent: "none",
        value: 1,
    }
};