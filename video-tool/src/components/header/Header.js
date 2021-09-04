import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle, verifyPermission, writeFile } from '../storage/file-access';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';
import { saveFailed, saveProgress, saveSuccess, AppToaster } from '../overlays/toaster';
import { StartupOverlay } from '../overlays/StartupOverlay';
import { getHandle, loadProject, verifyVideoFiles } from '../annotations/ProjectFactory';
import { retrieveAppDirHandle, retrieveVideoDirHandle, storeRecentProjectHandle } from '../storage/indexedDB';
import { ExportPopover } from './Export';
import { History } from './History';

export function Header(props) {
    const { projectDispatch, playerDispatch, project, annotations, canUndo, canRedo } = props;

    const [saved, setSaved] = useState(false);
    const [dirFlag, setDirFlag] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [openIcon, setOpenIcon] = useState("folder-close");

    // FIXME this requires some form of timeout
    useEffect(() => {
        setSaved(false);
    }, [project])

    const handleNewProject = async () => {
        try {
            if (!await retrieveAppDirHandle()) {
                setDirFlag(true);
            } else {
                setProjectFlag(true);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    const handleSaveProject = useCallback(async () => {
        // FIXME where to store filehandle reference?
        const fileHandle = getHandle(project);
        // console.log(project);

        let progToast = null;
        try {
            await verifyPermission(fileHandle);
            progToast = AppToaster.show(saveProgress);
            await writeFile(fileHandle, JSON.stringify(project));
            AppToaster.dismiss(progToast);
            AppToaster.show(saveSuccess);
            setSaved(true);
        } catch (error) {
            AppToaster.dismiss(progToast);
            AppToaster.show(saveFailed);
            // console.log(error);
        }
    }, [project]);

    useEffect(() => {
        window.addEventListener("beforeunload", handleSaveProject);

        return (() => {
            window.removeEventListener("beforeunload", handleSaveProject);
        });
    }, [handleSaveProject])

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
            // console.log(error);
        }
    }

    const getTitle = (fileHandle) => {
        if (fileHandle) {
            const title = fileHandle.name.replace(".vat", "");
            if (!saved) {
                return title + " *";
            }
            return title;
        }
        return "";
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
                <ExportPopover task={annotations} />
            </ButtonGroup>
            <text>{getTitle(project.fileHandle)}</text>
            <History
                project={project}
                projectDispatch={projectDispatch}
                canRedo={canRedo}
                canUndo={canUndo} />
            <ButtonGroup
                minimal={true}>

                <Divider />
                <Button icon="help" />
            </ButtonGroup>
        </header>
    );
}