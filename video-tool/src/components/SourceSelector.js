import { Button, FileInput } from '@blueprintjs/core';
import React, { useState } from 'react';
import { getLastVideoFile, storeCurrentVideoFile } from './storage/idb';


//FIXME "accept" for input form, reset form
export default function SourceSelector(props) {
    const { fps, playerDispatch } = props;

    const [file, setFile] = useState();

    // TODO at this point, mediaElement.srcObject is not supported in Chrome
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
    // FIXME, required input validation
    const handleInputChange = (inputFile) => {
        setFile(inputFile);
        console.log(inputFile);
        console.log(inputFile.type);

        storeCurrentVideoFile(inputFile);

        const url = URL.createObjectURL(inputFile);
        console.log(url);
        playerDispatch({ type: 'SRC_CHANGE', payload: { src: url } });
    }

    //FIXME super janky testing for loading old file
    return (
        <div>
            <Button
                onClick={() => { getLastVideoFile().then(val => handleInputChange(val)) }}
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