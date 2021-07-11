import { FileInput } from '@blueprintjs/core';
import React, { useState } from 'react';

//FIXME "accept" for input form, reset form
export default function SourceSelector(props) {
    const { playerDispatch } = props;

    const [file, setFile] = useState();

    // TODO at this point, mediaElement.srcObject is not supported in Chrome
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
    // FIXME, required input validation
    const handleInputChange = (inputFile) => {
        setFile(inputFile);
        console.log(inputFile);
        console.log(inputFile.type);

        const url = URL.createObjectURL(inputFile);
        console.log(url);
    }


    return (
        <FileInput
            onInputChange={e => { handleInputChange(e.target.files[0]) }}
            text={file ? file.name : "Choose file..."}
            hasSelection={file}
        ></FileInput>
    );

}