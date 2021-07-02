import { v4 as uuidv4 } from 'uuid';
import BoundingBox from '../canvas/BoundingBox';
import AnnotationTrack from "./AnnotationTrack";
import FrameAnnotation from './FrameAnnotation';

// TODO some sort of autonaming convention
// TODO some kind of auto changing colour
export default class Annotations {
    constructor(totalFrames) {
        this.annotations = new Map();
        this.totalFrames = totalFrames;
    }

    addTrack(name = null, colour, totalFrames, currentFrame) {
        const key = uuidv4();
        const track = new AnnotationTrack(name, colour, totalFrames);
        track.setAnnotation(currentFrame, new FrameAnnotation());
        this.annotations.set(key, track);
        return key;
    }

    deleteTrack(key) {
        if (!this.annotations.delete(key)) {
            throw new Error("Id" + key + "does not exist");
        }
    }

    getTrack(key) {
        const track = this.annotations.get(key);
        if (track === undefined) {
            throw new Error("Id" + key + "does not exist");
        }
        return track;
    }

    getTrackKeys() {
        return [...this.annotations.keys()];
    }

    setTrackName(key, name) {
        const track = this.getTrack(key);
        track.setName(name);
    }

    setTrackColour(key, colour) {
        const track = this.getTrack(key);
        track.setColour(colour);
    }

    getAllFrameAnnotations(frame) {
        const annotationList = [];
        this.annotations.forEach(track => {
            if (track.getAnnotation(frame) !== undefined) {
                annotationList.push(track.getAnnotation(frame));
            }
        })
        console.log("Annotation List", annotationList);
        return annotationList;
    }

    addFrameAnnotation(key, frame, annotation) {
        const track = this.getTrack(key);
        track.setAnnotation(frame, annotation);
    }

    getBoundingBoxes(frame) {
        const annotations = this.getAllFrameAnnotations(frame);
        console.log("Get BB Frame" + frame, annotations);
        const keys = this.getTrackKeys();
        const bboxes = [];

        annotations.forEach((element, index) => {
            const bbox = new BoundingBox(
                element.x,
                element.y,
                element.width,
                element.height,
                element.rotation,
            );
            bboxes.push(bbox);
        });

        return bboxes;
    }




}