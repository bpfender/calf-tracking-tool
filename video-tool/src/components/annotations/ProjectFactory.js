
import { v4 as uuidv4 } from 'uuid';
import { List, Map, setIn, updateIn } from "immutable";
import { loadTask, TaskFactory } from "./TaskFactory";

export function ProjectFactory() {
    const key = uuidv4();

    return {
        //FIXME name probably not needed
        name: "",
        fileHandle: null,
        selectedTask: key,
        tasks: Map([[key, TaskFactory()]]),
        labels: List(),

        toJSON: function () {
            return [
                this.name,
                this.fileHandle.name,
                this.selectedTask,
                this.tasks,
                this.labels,
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

        addLabel: function (label) {
            return updateIn(this, ['labels'], labels =>
                labels.push(label));
        },

        deleteLabel: function (label) {
            return updateIn(this, ['labels'], labels =>
                labels.delete(labels.findIndex(val => label === val)));
        },

        updateSelected: function (task) {
            return setIn(this, ['tasks', this.selectedTask], task);
        }
    };
}

export function loadProject(projectJSON) {
    const parsedProject = JSON.parse(projectJSON);
    console.log(parsedProject);

    const project = ProjectFactory();
    project.name = parsedProject[0];
    project.fileHandle = parsedProject[1];
    project.selectedTask = parsedProject[2];
    project.tasks = Map(Object.entries(parsedProject[3]).map(([key, value]) => [key, loadTask(value)]));
    project.labels = List(parsedProject[4]);

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


