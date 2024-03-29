import { Button, H5, Menu, MenuItem } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import React from 'react';
import { exportRotated, exportYOLOv5, exportYOLOv5Rotated } from '../storage/export-annotations';
import { getCreateDirHandle, getCreateFileHandle, getParentDirectory, writeFile } from '../storage/file-access';

export function ExportPopover(props) {
    const { task, playerState } = props;

    return (
        <Popover2
            children={<ExportButton />}
            content={
                <ExportMenu
                    task={task}
                    width={playerState.videoWidth}
                    height={playerState.videoHeight} />
            }
            position="bottom-left"
        />
    );
}

function ExportButton(props) {
    return (
        <Button
            icon="export"
            text="Export"
        />
    );
}

function ExportMenu(props) {
    const { task, width, height } = props;

    /*   const handleJSONExport = async () => {
           const dirHandle = await getParentDirectory();
           const fileHandle = await getCreateFileHandle(dirHandle, 'arrayJSON');
   
           const array = exportRotated(task);
           console.log(array);
           await writeFile(fileHandle, JSON.stringify(array));
       }*/


    return (
        <Menu>
            <ExportMenuItem
                taskName={task.videoHandle.name}
                content="YOLOv5"
                exportFunction={() => exportYOLOv5(task, width, height)} />
            <ExportMenuItem
                taskName={task.videoHandle.name}
                content="YOLOv5 rotated"
                exportFunction={() => exportYOLOv5Rotated(task)} />
        </Menu>
    )
}



function ExportMenuItem(props) {
    const { content, exportFunction, taskName } = props;

    const handleClick = async () => {
        try {
            const dirHandle = await getParentDirectory();
            const exportDirHandle = await getCreateDirHandle(dirHandle, `${content} - ${taskName}`);

            const annotationArray = exportFunction();
            // console.log(annotationArray);
            const size = annotationArray.length;
            const digits = size.toString().length;
            for (let i = 0; i < size; i++) {
                const frame = i + 1;
                const filename = frame.toString().padStart(digits, '0') + ".txt";

                const fileHandle = await getCreateFileHandle(exportDirHandle, filename);
                await writeFile(fileHandle, annotationArray[i]);
            }


        } catch (error) {
            // console.log(error);
        }
    };


    return (
        <MenuItem
            icon="annotation"
            text={content}
            onClick={handleClick} />
    );
}