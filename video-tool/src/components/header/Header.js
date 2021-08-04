import { Button, ButtonGroup, Divider, Icon } from '@blueprintjs/core';
import React, { useState } from 'react';
import { Project } from '../annotations/Project';
import SourceSelector from '../SourceSelector';
import { getNewFileHandle } from '../storage/file-access';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';

export function Header(props) {
    const { framerate, playerDispatch, annotations } = props;
    const [projectFlag, setProjectFlag] = useState(false);

    const [openIcon, setOpenIcon] = useState("folder-close");

    const handleNewProject = async () => {
        setProjectFlag(true);
    };

    const handleSaveProject = () => { };
    const handleOpenProject = () => { };



    return (
        <header className={props.className}>
            <ButtonGroup
                minimal={true}>
                <Button
                    icon="document"
                    onClick={handleNewProject} />
                <Button
                    icon={openIcon}
                    onClick={handleOpenProject}
                    onMouseEnter={() => { setOpenIcon("folder-open") }}
                    onMouseLeave={() => { setOpenIcon("folder-close") }} />
                <Button
                    icon="floppy-disk"
                    onClick={handleSaveProject} />
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

            <NewProjectOverlay
                open={projectFlag}
                setOpen={setProjectFlag} />



            <SourceSelector
                open={projectFlag}
                setOpen={setProjectFlag}
                fps={framerate}
                playerDispatch={playerDispatch}
                annotations={annotations}>
            </SourceSelector>
        </header>
    );
}