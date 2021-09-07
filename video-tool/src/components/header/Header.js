import { Button, ButtonGroup, Divider, Navbar, } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { NewProjectOverlay } from '../overlays/NewProjectOverlay';
import { getProjectHandle, verifyPermission, writeFile } from '../storage/file-access';
import { DirectoryOverlay } from '../overlays/DirectoryOverlay';
import { saveFailed, saveProgress, saveSuccess, AppToaster } from '../overlays/toaster';
import { StartupOverlay } from '../overlays/StartupOverlay';
import { loadProject } from '../annotations/ProjectFactory';
import { retrieveAppDirHandle, retrieveVideoDirHandle, storeRecentProjectHandle } from '../storage/indexedDB';
import { ExportPopover } from './Export';
import { History } from './History';
import './Header.scss';
import { HelpDrawer } from '../overlays/HelpDrawer';
import { keyCode, useKeydown } from '../video/useKeydown';


export function Header(props) {
    const { projectDispatch, playerDispatch, project, annotations, canUndo, canRedo, playerState } = props;

    const [saved, setSaved] = useState(false);

    const [startupFlag, setStartupFlag] = useState(true);
    const [dirFlag, setDirFlag] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [drawerFlag, setDrawerFlag] = useState(false);

    const loadedFlag = useRef(false);

    const [openIcon, setOpenIcon] = useState("folder-close");

    // FIXME this requires some form of timeout
    useEffect(() => {
        if (!loadedFlag.current) {
            setSaved(false);
        } else {
            loadedFlag.current = false;
        }
    }, [project])

    const handleNewProject = async () => {
        try {
            if (!await retrieveAppDirHandle()) {
                setDirFlag(true);
            } else {
                setProjectFlag(true);
            }
        } catch (error) {
            // Do nothing
        }
    };

    const handleSaveProject = async () => {
        const fileHandle = project.getHandle();

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
    };

    const checkDirHandleSet = async () => {
        return await retrieveAppDirHandle() ? true : false;
    }

    const handleOpenProject = async () => {
        try {
            if (!await checkDirHandleSet()) {
                setDirFlag(true);
            } else {
                const appDirHandle = await retrieveAppDirHandle();
                const videoDirHandle = await retrieveVideoDirHandle();

                await verifyPermission(appDirHandle);

                const projectHandle = await getProjectHandle(appDirHandle);
                const projectFile = await projectHandle.getFile();
                const projectJSON = await projectFile.text();

                const project = loadProject(projectJSON);
                project.fileHandle = projectHandle;

                await project.registerVideoHandles(videoDirHandle);

                await storeRecentProjectHandle(projectHandle);

                loadedFlag.current = true;
                projectDispatch({
                    type: 'LOAD_PROJECT',
                    payload: { project: project },
                });
            }
        } catch (error) {
            // Do nothing
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
                open={startupFlag}
                setOpen={setStartupFlag}
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
            <HelpDrawer
                open={drawerFlag}
                setOpen={setDrawerFlag} />

            <div
                className="header-panel">
                <ButtonGroup
                    minimal={true}
                    className="header-buttons">
                    <Button
                        icon="document"
                        text="New"
                        onClick={handleNewProject} />
                    <Button
                        icon={openIcon}
                        text="Open"
                        onClick={handleOpenProject}
                        onMouseEnter={() => { setOpenIcon("folder-open") }}
                        onMouseLeave={() => { setOpenIcon("folder-close") }} />
                    <Button
                        icon="floppy-disk"
                        text="Save"
                        onClick={handleSaveProject} />
                    <ExportPopover task={annotations} playerState={playerState} />
                </ButtonGroup>
                <text className="header-title">{getTitle(project.fileHandle)}</text>
                <History
                    project={project}
                    projectDispatch={projectDispatch}
                    canRedo={canRedo}
                    canUndo={canUndo} />
            </div>
            <div className="header-settings">
                <Button
                    minimal={true}
                    icon="help"
                    onClick={() => { setDrawerFlag(!drawerFlag) }} />
            </div>
        </header>
    );
}