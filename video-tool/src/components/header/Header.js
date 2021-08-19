import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle, verifyPermission, writeFile } from '../storage/file-access';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';
import { saveFailed, saveProgress, saveSuccess, AppToaster } from '../overlays/toaster';
import { StartupOverlay } from '../overlays/StartupOverlay';
import { getHandle, loadProject, verifyVideoFiles } from '../annotations/ProjectFactory';
import { retrieveAppDirHandle, retrieveVideoDirHandle, storeRecentProjectHandle } from '../storage/indexedDB';
import { FindFilesOverlay } from '../overlays/FindFilesOverlay';

export function Header(props) {
    const { projectDispatch, playerDispatch, project } = props;

    const [dirFlag, setDirFlag] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [openIcon, setOpenIcon] = useState("folder-close");

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
            if (!await retrieveAppDirHandle()) {
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
        console.log(project);

        let progToast = null;
        try {
            await verifyPermission(fileHandle);
            progToast = AppToaster.show(saveProgress);
            await writeFile(fileHandle, JSON.stringify(project));
            AppToaster.dismiss(progToast);
            AppToaster.show(saveSuccess);
        } catch (error) {
            AppToaster.dismiss(progToast);
            AppToaster.show(saveFailed);
            console.log(error);
        }
    };

    const handleOpenProject = async () => {
        try {
            const appDirHandle = await retrieveAppDirHandle();
            const videoDirHandle = await retrieveVideoDirHandle();

            await verifyPermission(appDirHandle);

            const projectHandle = await getProjectHandle(appDirHandle);
            const projectFile = await projectHandle.getFile();
            const projectJSON = await projectFile.text();

            const project = loadProject(projectJSON);
            project.fileHandle = projectHandle;

            await verifyVideoFiles(project, videoDirHandle);

            await storeRecentProjectHandle(projectHandle);

            projectDispatch({
                type: 'LOAD_PROJECT',
                payload: { project: project },
            });

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
            <text>{project.fileHandle ? project.fileHandle.name : ""}</text>
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