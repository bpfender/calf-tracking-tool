import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { get, set } from 'idb-keyval';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle, verifyPermission, writeFile } from '../storage/indexedDB';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';
import { saveFailed, saveSuccess, SaveToaster } from '../overlays/toaster';
import { StartupOverlay } from '../overlays/StartupOverlay';
import { getHandle, loadProject } from '../annotations/ProjectFactory';

export function Header(props) {
    const { projectDispatch, playerDispatch, project } = props;

    const [dirFlag, setDirFlag] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [openIcon, setOpenIcon] = useState("folder-close");
    const dirHandleRef = useRef(null);

    // FIXME this requires some form of timeout
    useEffect(() => {
        /*console.log("AUTOSAVE");
        const autoSave = async () => {
            await set('autoSave', {
                project: JSON.stringify(project),
                timeSaved: Date.now(),
            });
        }

        autoSave();*/
    }, [project])

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
        // FIXME where to store filehandle reference?
        const fileHandle = getHandle(project);
        try {
            await verifyPermission(fileHandle);
            await writeFile(fileHandle, JSON.stringify(project));
            SaveToaster.show(saveSuccess);
        } catch (error) {
            SaveToaster.show(saveFailed);
            console.log(error);
        }
    };

    const handleOpenProject = async () => {
        try {
            const dirHandle = await get('parentDir');
            const projectHandle = await getProjectHandle(dirHandle);
            const projectFile = await projectHandle.getFile();
            const projectJSON = await projectFile.text();

            const project = loadProject(projectJSON);
            project.fileHandle = projectHandle;


            await set('projectFile', projectHandle);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className={props.className}>
            <StartupOverlay
                project={project}
                handleNewProject={handleNewProject}
                handleOpenProject={handleOpenProject} />
            <DirectoryOverlay
                open={dirFlag}
                setDirFlag={setDirFlag}
                setProjectFlag={setProjectFlag} />
            <NewProjectOverlay
                open={projectFlag}
                setOpen={setProjectFlag}
                dirHandle={dirHandleRef.current}
                projectDispatch={projectDispatch}
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
            <text>{project ? project.name : ""}</text>
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