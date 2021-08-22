// FIXME no scaling yet
export function exportYOLOv5(task) {
    const tags = [...task.tags.keys()];
    const fileArray = [];

    for (let frame = 1; frame <= task.totalFrames; frame++) {
        let s = "";
        let tagIndex = 0;
        for (const tag of tags) {
            const keys = task.getTagIds(tag);
            for (const key of keys) {
                const label = task.getTrack(key).getLabel(frame);
                const rotation = label.rotation;
                const x = label.x;
                const y = label.y;
                const h = label.w * Math.cos(rotation) + label.h * Math.sin(rotation);
                const w = label.w * Math.sin(rotation) + label.h * Math.cos(rotation);

                s += `${tagIndex} ${x} ${y} ${h} ${w}\n`;
            }

            tagIndex++;
        }
        fileArray.push(s);
    }
    console.log(fileArray)
    return fileArray;
}

export function exportYOLOv5Rotated(task) {
    const tags = [...task.tags.keys()];
    const fileArray = [];

    for (let frame = 1; frame <= task.totalFrames; frame++) {
        let s = "";
        let tagIndex = 0;
        for (const tag of tags) {
            const keys = task.getTagIds(tag);
            for (const key of keys) {
                const label = task.getTrack(key).getLabel(frame);
                const x = label.x;
                const y = label.y;
                const w = label.w;
                const h = label.h;
                const rotation = label.rotation;

                s += `${tagIndex} ${x} ${y} ${h} ${w} ${rotation}\n`;
            }

            tagIndex++;
        }
        fileArray.push(s);
    }
    return fileArray;
}
