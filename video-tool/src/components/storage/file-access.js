//https://web.dev/file-system-access/
export async function getParentDirectory() {
    const dirHandle = await window.showDirectoryPicker({ startIn: 'documents' });
    return dirHandle;
}

export async function createNewProjectHandle(dirHandle, filename) {
    const handle = await dirHandle.getFileHandle(filename + ".vat", { create: true });
    return handle;
}

export async function getProjectHandle(dirHandle) {
    const startIn = dirHandle ? dirHandle : 'documents';
    console.log(startIn);
    const options = {
        startIn: startIn,
        types: [
            {
                description: 'VAT Project File',
                accept: { 'application/json': ['.vat'] }
            },
        ],
        multiple: false,
    };

    const [handle] = await window.showOpenFilePicker(options);
    return handle;
}

export async function readFile() {

}

export async function writeFile(fileHandle, data) {
    const writable = await fileHandle.createWritable()
    await writable.write(data);
    await writable.close();
}

export async function verifyPermission(handle) {
    const options = {
        mode: 'readwrite',
    };

    if (await handle.queryPermission(options) === 'granted') {
        return true;
    }

    if (await handle.requestPermission(options) === 'granted') {
        return true;
    }

    return false;
}