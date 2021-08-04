import { set, get } from "idb-keyval";

//https://web.dev/file-system-access/
export async function getParentDirectory() {
    const dirHandle = await window.showDirectoryPicker({ startIn: 'documents' });
    await set('parentDir', dirHandle);
    return dirHandle;
}




export async function getNewProjectHandle(filename) {
    const options = {
        id: 'project',
        startIn: 'documents',
        suggestedName: filename + ".vat",
        types: [
            {
                description: 'VAT Project File',
                accept: { 'application/json': ['.vat'] }
            }
        ]
    };

    const handle = await window.showSaveFilePicker(options);


    return handle;
}

export async function getProjectHandle() {
    const options = {
        id: 'project',
        startIn: 'documents',
        types: [
            {
                description: 'VAT Project File',
                accept: { 'application/json': ['.vat'] }
            },
        ],
        multiple: false,
    }

    const [handle] = await window.showOpenFilePicker(options);
    return handle;
}

export async function readFile() {

}

export async function writeFile() {

}

export async function verifyPermission() {

}