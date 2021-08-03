export class Task {
    constructor() {
        this._videoName = "";
        this._videoHandle = null;
        this._task = null;
    }

    set videoName(name) {
        this._videoHandle = name;
    }
    get videoName() {
        return this._videoHandle;
    }
    set videoHandle(videoHandle) {
        this._videoHandle = videoHandle;
    }
    get videoHandle() {
        return this._videoHandle;
    }


}