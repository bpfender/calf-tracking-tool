import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { get, set } from 'idb-keyval';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle, verifyPermission, writeFile } from '../storage/file-access';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';
import { saveFailed, saveSuccess, SaveToaster } from '../overlays/toaster';
import { StartupOverlay } from '../overlays/StartupOverlay';

export function Header(props) {
    const { playerDispatch } = props;

    const [title, setTitle] = useState("");
    const [dirFlag, setDirFlag] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [openIcon, setOpenIcon] = useState("folder-close");
    const dirHandleRef = useRef(null);

    // TODO needs actual project value
    const autoSave = async () => {
        await set('autoSave', "project");
    };

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
            await set('projectFile', projectHandle);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className={props.className}>
            <StartupOverlay
                handleNewProject={handleNewProject}
                handleOpenProject={handleOpenProject} />
            <DirectoryOverlay
                open={dirFlag}
                setDirFlag={setDirFlag}
                setProjectFlag={setProjectFlag} />
            <NewProjectOverlay
                open={projectFlag}
                setOpen={setProjectFlag}
                setTitle={setTitle}
                dirHandle={dirHandleRef.current}
                playerDispatch={playerDispatch} />


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
            <text>{title}</text>
            <ButtonGroup
                minimal={true}>
                <Button
                    icon="undo" />
                <Button
                    icon="redo" />
                <Divider />
                <Button icon="help" />
            </ButtonGroup>
        </header>
    );
}