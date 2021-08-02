export function setAnchorFrame(anchors, frame) {
    const i = getInsertionIndex(anchors, frame);

    // If index value = frame it is already an anchor
    if (anchors.get(i) === frame) {
        return anchors;
    }
    return anchors.insert(i, frame);
}

// Find index of equal or greater anchor value
function getInsertionIndex(anchors, frame) {
    if (anchors.size === 0) {
        return 0;
    }

    const i = anchors.findIndex(val => val >= frame);
    return i >= 0 ? i : anchors.size;
}

export function getNextAnchor(anchors, frame) {
    const i = getInsertionIndex(anchors, frame);

    // If frame is larger than all anchors, no next anchor
    if (i === anchors.size) {
        return -1;
    }

    const anchor = anchors.get(i);
    if (anchor === frame) {
        // If frame is last anchor in list, no next anchor
        if (i === anchors.size - 1) {
            return -1;
        } else {
            return anchors.get(i + 1);
        }
    }

    return anchor;
}

export function getPrevAnchor(anchors, frame) {
    const i = getInsertionIndex(anchors, frame);

    // If index is 0 there is no previous index
    if (i === 0) {
        return -1;
    }
    return anchors.get(i - 1);
}