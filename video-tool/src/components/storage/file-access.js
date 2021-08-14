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
export async function getVideoHandle(dirHandle = null, multiple = false) {
    const startIn = dirHandle ? dirHandle : 'videos';
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
                multiple: multiple,
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

export async function getVideoDirHandle(parentDir) {
    return await parentDir.getDirectoryHandle("videos", { create: true });
}


export async function selectMoveVideoIntoProject(dirHandle) {
    const videoSrcHandle = await getVideoHandle(dirHandle);
    const videoDirHandle = await getVideoDirHandle(dirHandle);
    const videoDestHandle = await videoDirHandle.getFileHandle(videoSrcHandle.name, { create: true })

    const videoSrcFile = await videoSrcHandle.getFile();
    const videoSrcStream = await videoSrcFile.stream();
    const videoDestStream = await videoDestHandle.createWritable();

    await videoSrcStream.pipeTo(videoDestStream);

    return videoDestHandle;
}


async function fileExists(file, destDirHandle) {
    const filenames = await destDirHandle.entries();

    for (const filename of filenames) {
        if (file.name === filename) {
            return true;
        }
    }

    return false;
}

async function fileInFolder(fileHandle, destDirHandle) {
    const filePath = await destDirHandle.resolve(fileHandle);
    const dirPath = await destDirHandle.resolve(destDirHandle);

    // If file path is null, it's not in the same dir
    if (!filePath) {
        return false;
    }

    // If they share a parent directory, check paths are equal
    dirPath.forEach((subPath, i) => {
        if (filePath[i] !== subPath) {
            return false;
        }
    })

    return true;
}

async function moveFileIntoFolder(file, destDirHandle) {
    const destFileHandle = await destDirHandle.getFileHandle(file.name, { create: true });
    const destFileWritable = await destFileHandle.createWritable();

    const fileStream = await file.stream();

    await fileStream.pipeTo(destFileWritable);

}

//https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers

function validateVideoFile(file) {
    const MIMEtypes = []
}