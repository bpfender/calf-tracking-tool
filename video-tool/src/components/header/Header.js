import { Button, ButtonGroup, Divider, Icon } from '@blueprintjs/core';
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
                <Divider />
                <Button
                    icon="import" />
                <Button
                    icon="export" />
            </ButtonGroup>
            <text>PROJECT NAME</text>
            <ButtonGroup
                minimal={true}>
                <Button
                    icon="undo" />
                <Button
                    icon="redo" />
                <Divider />
                <Button icon="help" />
            </ButtonGroup>

            <SourceSelector
                fps={framerate}
                playerDispatch={playerDispatch}
                annotations={annotations}>
            </SourceSelector>
        </header>
    );
}