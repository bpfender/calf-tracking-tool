export async function getNewFileHandle(filename) {
    const options = {
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

export async function getFileHandle() {

}

export async function readFile() {

}

export async function writeFile() {

}

export async function verifyPermission() {

}