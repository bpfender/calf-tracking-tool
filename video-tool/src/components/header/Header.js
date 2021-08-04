import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import React, { useRef, useState } from 'react';
import { get, set } from 'idb-keyval';
import SourceSelector from '../SourceSelector';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle, verifyPermission, writeFile } from '../storage/file-access';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';
import { saveFailed, saveSuccess, SaveToaster } from '../overlays/toaster';

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

    const handleSaveProject = async () => {
        const fileHandle = null, data = null;
        try {
            await verifyPermission(fileHandle);
            await writeFile(fileHandle, data);
            SaveToaster(saveSuccess);
        } catch (error) {
            SaveToaster.show(saveFailed);
            console.log(error);
        }
    };

    const handleOpenProject = async () => {
        try {
            const dirHandle = await get('parentDir');
            const projectHandle = getProjectHandle(dirHandle);
            await set('project', projectHandle);
        } catch (error) {
            console.log(error);
        }
    }

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