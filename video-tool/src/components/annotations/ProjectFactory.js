
import { v4 as uuidv4 } from 'uuid';
import { List, Map, setIn, updateIn } from "immutable";
import { loadTask, TaskFactory } from "./TaskFactory";

export function ProjectFactory() {
    const key = uuidv4();

    return {
        fileHandle: null,
        selectedTask: key,
        tasks: Map([[key, TaskFactory()]]),
        tags: List(),

        toJSON: function () {
            return [
                this.fileHandle.name,
                this.selectedTask,
                this.tasks,
                this.tags,
            ];
        },

        initialiseProject: function (fileHandle) {
            return setIn(this, ['fileHandle'], fileHandle);
        },

        setSelectedTask: function (key) {
            return setIn(this, ['selectedTask'], key);
        },

        getSelectedTask: function () {
            return this.tasks.get(this.selectedTask);
        },

        // TODO probably remove handle
        addTask: function (videoHandle) {
            const key = uuidv4();
            const newProject = updateIn(this, ['tasks'], tasks =>
                tasks.set(key, TaskFactory(videoHandle)));
            newProject.selectedTask = key;
            console.log(newProject)
            return newProject;
        },

        deleteTask: function (key) {
            const newProject = updateIn(this, ['tasks'], tasks =>
                tasks.delete(key)
            )

            console.log(key === newProject.selectedTask)
            if (newProject.selectedTask === key) {
                newProject.selectedTask = newProject.tasks.keys().next().value;
            }

            return newProject;
        },

        addTag: function (tag) {
            return updateIn(this, ['tags'], tags =>
                tags.push(tag));
        },

        deleteTag: function (tag) {
            return updateIn(this, ['tags'], tags =>
                tags.delete(tags.findIndex(val => tags === val)));
        },

        updateSelected: function (task) {
            return setIn(this, ['tasks', this.selectedTask], task);
        }
    };
}

export function loadProject(projectJSON) {
    const parsedProject = JSON.parse(projectJSON);

    const project = ProjectFactory();
    project.fileHandle = parsedProject[0];
    project.selectedTask = parsedProject[1];
    project.tasks = Map(Object.entries(parsedProject[2]).map(([key, value]) => [key, loadTask(value)]));
    project.tags = List(parsedProject[3]);

    return project;
}








export function initialiseProject(project, fileHandle) {
    const newProject = setIn(project, ['fileHandle'], fileHandle);
    newProject.name = fileHandle.name;
    return newProject;
}

export async function verifyVideoFiles(project, videoDirHandle) {
    const tasks = project.tasks;

    for (const task of tasks.values()) {
        try {
            const videoHandle = await videoDirHandle.getFileHandle(task.videoHandle);
            task.videoHandle = videoHandle;

        } catch (error) {
            console.log(error);
        }
    }
}

export function setHandle(project, handle) {
    return setIn(project, ['fileHandle'], handle);
}

export function setSelectedKey(project, key) {
    return setIn(project, ['selectedTask'], key);
}

export function addTask(project, videoHandle) {
    const key = uuidv4();
    const newMap = project.tasks.set(key, TaskFactory(videoHandle));
    const newProject = setIn(project, ['tasks'], newMap);
    newProject.selectedTask = key;

    return newProject;
}

export function updateTask(project, task) {
    const newMap = project.tasks.set(project.selectedTask, task);
    return setIn(project, ['tasks'], newMap);
}

export function addLabel(project, label) {
    const newLabels = project.labels.push(label);
    return setIn(project, ['labels'], newLabels);
}

export function removeLabel(project, label) {
    const newLabels = project.labels.delete(project.labels.findIndex(val => label === val))
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
    return project.tasks.get(key);
}

export function getCurrentTask(project) {
    return project.tasks.get(project.selectedTask);
}


