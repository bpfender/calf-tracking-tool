
import { v4 as uuidv4 } from 'uuid';
import { List, Map, setIn } from "immutable";
import { TaskFactory } from "./TaskFactory";

export function ProjectFactory(name, fileHandle) {
    return {
        name: name,
        fileHandle: fileHandle,
        selectedTask: null,
        tasks: Map(),
        labels: List(),
    }
}

export function setHandle(project, handle) {
    return setIn(project, ['fileHandle'], handle);
}

export function setSelectedKey(project, key) {
    return setIn(project, ['selectedTask'], key);
}

export function addTask(project) {
    const key = uuidv4();
    const newMap = project.tasks.set(key, TaskFactory());
    const newProject = setIn(project, ['tasks'], newMap);
    newProject.selectedTask = key;

    return newProject;
}

export function updateTask(project, task) {
    const newMap = project.task.set(project.selectedTask, task);
    return setIn(project, ['tasks'], newMap);
}

export function addLabel(project, label) {
    const newLabels = project.labels.push(label);
    return setIn(project, ['labels'], newLabels);
}

export function getName(project) {
    return project.name;
}

export function getHandle(project) {
    return project.fileHandle;
}

export function getSelectedKey(project) {
    return project.selectedTask;
}

export function getTask(project, key) {
    return project.tasks(key);
}

export function generateProjectJSON(project) {
    const plainObject = {
        name: project.name,
        fileHandle: project.fileHandle,
        selectedTask: project.selectedTask,
        tasks: project.tasks.toJS(),
        labels: project.labels.toJS(),
    };

    return JSON.stringify(plainObject);
}

export function readProjectJSON(project) {

}