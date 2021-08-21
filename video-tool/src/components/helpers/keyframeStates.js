export const keyframeState = {
    waiting: 0,
    ready: 1,
    processing: 2,
    cancel: 3,
    done: 4,
    reset: 5,
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
        text: "Reset",
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