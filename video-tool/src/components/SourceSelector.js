import { Button, FileInput } from '@blueprintjs/core';
import React, { useState } from 'react';
import { generateJSON, readJSON } from './annotations/TaskFactory';
import { exportYOLOv5 } from './storage/export-annotations';
import { getAnnotationData, getLastVideoFile, storeAnnotationData, storeCurrentVideoFile } from './storage/local-storage';


//FIXME "accept" for input form, reset form
export default function SourceSelector(props) {
    const { fps, playerDispatch, annotations } = props;

    const [file, setFile] = useState();

    // TODO at this point, mediaElement.srcObject is not supported in Chrome
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
    // FIXME, required input validation
    const handleInputChange = (inputFile) => {
        setFile(inputFile);

        storeCurrentVideoFile(inputFile);

        const url = URL.createObjectURL(inputFile);
        playerDispatch({ type: 'SRC_CHANGE', payload: { src: url } });
    }

    //FIXME super janky testing for loading old file
    return (
        <div>
            <Button
                onClick={() => { exportYOLOv5(annotations) }}
            >ANNOTATION</Button>
            <Button
                onClick={() => {
                    storeAnnotationData(generateJSON(annotations));
                    //// console.log(JSON.stringify(generateJSON(annotations)));
                }}>
                Export
            </Button>
            <Button
                onClick={() => {
                    getAnnotationData().then(async (val) => {
                        // console.log(readJSON(val));
                    })
                }}>
                Import
            </Button>
            <Button
                onClick={filePicker}
            />
            <Button
                onClick={() => {
                    getLastVideoFile().then(async (val) => {
                        let state = await val.queryPermission();

                        await val.requestPermission();
                        handleInputChange(await val.getFile())
                    })
                }}
            ></Button>
            <FileInput
                onInputChange={e => { handleInputChange(e.target.files[0]) }}
                text={file ? file.name : "Choose file..."}
                hasSelection={file}
            ></FileInput>
            <p>{fps === 0 ? "Detecting framerate..." : `${fps} fps`}</p>
        </div >
    );
}

async function filePicker() {
    let [videoHandle] = await window.showOpenFilePicker();
    // console.log(videoHandle);
    storeCurrentVideoFile(videoHandle);
    // console.log(await videoHandle.getFile());
}
