import { FileInput } from '@blueprintjs/core';
import React, { useState } from 'react';

//FIXME "accept" for input form, reset form
export default function SourceSelector(props) {
    const [file, setFile] = useState();

    const handleInputChange = (inputFile) => {

        setFile(inputFile);
        console.log(inputFile);
    }


    return (
        <FileInput
            onInputChange={e => { handleInputChange(e.target.files[0]) }}
            text={file ? file.name : "Choose file..."}
            hasSelection={file}
        ></FileInput>
    );

}