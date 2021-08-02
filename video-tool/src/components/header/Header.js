import { Button, ButtonGroup, Icon } from '@blueprintjs/core';
import React, { useState } from 'react';
import SourceSelector from '../SourceSelector';

export function Header(props) {
    const { framerate, playerDispatch, annotations } = props;
    const [openFile, setOpenFile] = useState("folder-close");

    const handleNewProject = () => { };
    const handleSave = () => { };
    const handleOpen = () => { };



    return (
        <header className={props.className}>
            <ButtonGroup
                minimal={true}>
                <Button
                    icon="document"
                    onClick={handleNewProject} />
                <Button
                    icon={openFile}
                    onClick={handleOpen}
                    onMouseEnter={() => { setOpenFile("folder-open") }}
                    onMouseLeave={() => { setOpenFile("folder-close") }} />
                <Button
                    icon="floppy-disk"
                    onClick={handleSave} />
                <Button
                    icon="export" />
            </ButtonGroup>
            <title>PROJECT NAME</title>
            <Icon icon="help"></Icon>

            <SourceSelector
                fps={framerate}
                playerDispatch={playerDispatch}
                annotations={annotations}>
            </SourceSelector>
        </header>
    );
}