export async function getNewFileHandle() {
    const handle = await window.showSaveFilePicker();
    return handle;
}