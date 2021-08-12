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

//TODO check MIME types
export async function getVideoHandle(dirHandle) {
    const startIn = dirHandle ? dirHandle : 'video';
    const options = {
        startIn: startIn,
        types: [
            {
                description: 'Video file',
                accept: {
                    'video/mp4': ['.mp4'],
                    'video/mpeg': ['.mpeg'],
                    'video/ogg': ['.ogv'],
                    'video/webm': ['.webm'],
                },
                multiple: false,
            }
        ]
    }

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

export async function selectMoveVideoIntoProject(dirHandle) {
    const videoSrcHandle = await getVideoHandle(dirHandle);
    const videoFolderHandle = await dirHandle.getDirectoryHandle("videos", { create: true });
    const videoDestHandle = await videoFolderHandle.getFileHandle(videoSrcHandle.name, { create: true })

    const videoSrcFile = await videoSrcHandle.getFile();
    const videoSrcStream = await videoSrcFile.stream();
    const videoDestStream = await videoDestHandle.createWritable();

    await videoSrcStream.pipeTo(videoDestStream);

    return videoDestHandle;
}