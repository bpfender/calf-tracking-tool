import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import React, { useRef, useState } from 'react';
import { get } from 'idb-keyval';
import SourceSelector from '../SourceSelector';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle } from '../storage/file-access';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';

export function Header(props) {
    const { framerate, playerDispatch, annotations } = props;
    const [dirFlag, setDirFlag] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [openIcon, setOpenIcon] = useState("folder-close");
    const dirHandleRef = useRef(null);

    const handleNewProject = async () => {
        try {
            dirHandleRef.current = await get('parentDir');
            if (!dirHandleRef.current) {
                setDirFlag(true);
            } else {
                setProjectFlag(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveProject = () => { };

    const handleOpenProject = async () => {
        const dirHandle = await get('parentDir');
        const projectHandle = getProjectHandle(dirHandle);
    };



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

            <DirectoryOverlay
                open={dirFlag}
                setOpen={setDirFlag}
                setProject={setProjectFlag} />
            <NewProjectOverlay
                open={projectFlag}
                setOpen={setProjectFlag}
                dirHandle={dirHandleRef.current} />


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