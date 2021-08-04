import { Task } from "./Task";

export class Project {
    constructor(name, fileHandle) {
        this._name = ""
        this._fileHandle = fileHandle;
        this.tasks = [new Task()];
        this.labels = [];
        this.predictor = null;
    }

    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set fileHandle(fileHandle) {
        this._fileHandle = fileHandle;
    }
    get fileHandle() {
        return this._fileHandle;
    }

}