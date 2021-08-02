import { getLabel } from "../annotations/TrackFactory";


export function exportVATVideo(annotations) {

}


// FIXME no scaling yet
export function exportYOLOv5(annotations) {
    const size = annotations.totalFrames;
    const fileArray = [];
    const annotationClass = "0";

    for (let frame = 1; frame <= size; frame++) {
        let s = "";
        for (const track of annotations.tracks.values()) {
            const label = getLabel(track, frame);
            const rotation = label.rotation;
            const x = label.x;
            const y = label.y;
            const h = label.w * Math.cos(rotation) + label.h * Math.sin(rotation);
            const w = label.w * Math.sin(rotation) + label.h * Math.cos(rotation);

            s += `${annotationClass}, ${x}, ${y}, ${h}, ${w}\n`;
        }
        fileArray.push(s);
    }

    console.log(fileArray);
}

export function exportYOLOv5Rotated(annotations) {

}

export function exportMOT(annotations) {

}