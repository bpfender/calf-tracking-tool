// FIXME no scaling yet
export function exportYOLOv5(task, width, height) {
    const tags = [...task.tags.keys()];
    const fileArray = [];

    for (let frame = 1; frame <= task.totalFrames; frame++) {
        let s = "";
        let tagIndex = 0;
        for (const tag of tags) {
            const keys = task.getTagIds(tag);
            for (const key of keys) {
                const label = task.getTrack(key).getLabel(frame);
                if (label) {
                    const rotation = label.rotation * Math.PI / 180;
                    const x = label.x;
                    const y = label.y;
                    const w = (Math.abs(label.w * width * Math.cos(rotation)) + Math.abs(label.h * height * Math.sin(rotation))) / width;
                    const h = (Math.abs(label.w * width * Math.sin(rotation)) + Math.abs(label.h * height * Math.cos(rotation))) / height;

                    s += `${tagIndex} ${x} ${y} ${w} ${h}\n`;
                }
            }

            tagIndex++;
        }
        fileArray.push(s);
    }
    // console.log(fileArray)
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
                if (label) {
                    const x = label.x;
                    const y = label.y;
                    const w = label.w;
                    const h = label.h;
                    const rotation = label.rotation;

                    s += `${tagIndex} ${x} ${y} ${w} ${h} ${rotation}\n`;
                }
            }

            tagIndex++;
        }
        fileArray.push(s);
    }
    return fileArray;
}

export function exportRotated(task) {
    const tags = [...task.tags.keys()];
    const frameArray = [];

    for (let frame = 1; frame <= task.totalFrames; frame++) {
        let s = "";
        const labels = [];
        let tagIndex = 0;
        for (const tag of tags) {
            const keys = task.getTagIds(tag);
            for (const key of keys) {
                const label = task.getTrack(key).getLabel(frame);
                if (label) {
                    const x = label.x * 800;
                    const y = label.y * 600;
                    const w = label.w * 800;
                    const h = label.h * 600;
                    const rotation = label.rotation;

                    labels.push([x, y, w, h, rotation]);
                }
            }

            tagIndex++;
        }
        frameArray.push(labels);
    }
    return frameArray;
}
