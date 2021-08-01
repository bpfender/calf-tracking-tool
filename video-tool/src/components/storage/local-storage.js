import { get, set } from "idb-keyval";

export function storeCurrentVideoFile(file) {
    set("file", file)
        .then(() => console.log("FILE SAVED"))
        .catch((err) => console.log("FAILURE", err));
}

export async function getLastVideoFile() {
    return await get("file").then((val) => val);
}

//FIXME error handling
export function storeAnnotationData(annotations) {
    set("annotations", annotations)
        .then(() => console.log("ANNOTATIONS SAVED"))
        .catch((err) => console.log("FAILURE", err));
}

export async function getAnnotationData() {
    return await get("annotations");
}