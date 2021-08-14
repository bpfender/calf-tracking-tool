import { get, set } from "idb-keyval";

const appDir = 'parentDir';
const videoDir = 'videoDir';
const recent = 'recent';
const autoSave = 'autoSave';


export async function storeAppDirHandle(dirHandle) {
    await set(appDir, dirHandle);
}

// FIXME need to do some kind of error handling if this can't be retrieved
export async function retrieveAppDirHandle() {
    return await get(appDir);
}

export async function storeVideoDirHandle(dirHandle) {
    await set(videoDir, dirHandle);
}

export async function retrieveVideoDirHandle() {
    return await get(videoDir);
}

export async function storeAutoSave(saveData) {
    await set(autoSave, saveData);
}

export async function retrieveAutoSave() {
    return await get(autoSave);
}

export async function storeRecentProjectHandle(fileHandle) {
    await set(recent, fileHandle);
}

export async function retrieveRecentProjectHandle() {
    return await get(recent);
}