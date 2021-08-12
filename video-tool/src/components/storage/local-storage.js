import { get, set } from "idb-keyval";

const recent = 'recent';
const appDir = 'appDir';
const autoSave = 'autoSave';


export async function setAppDirectoryHandle(dirHandle) {
    await set(appDir, dirHandle);
}

export async function getAppDirectoryHandle() {
    await get(appDir);
}

export async function setAutoSave(saveData) {
    await set(autoSave, saveData);
}

export async function getAutoSave() {
    await get(autoSave);
}

export async function setRecentProjectHandle(fileHandle) {
    await set(recent, fileHandle);
}

export async function getRecentProjectHandle() {
    return await get(recent);
}