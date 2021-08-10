
import { v4 as uuidv4 } from 'uuid';
import { List, Map, setIn } from "immutable";
import { TaskFactory } from "./TaskFactory";


export function ProjectFactory(name, fileHandle) {
    const key = uuidv4();

    return {
        name: name,
        fileHandle: fileHandle,
        selectedTask: key,
        tasks: Map([[key, TaskFactory()]]),
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