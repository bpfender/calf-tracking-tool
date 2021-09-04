import { Button, ButtonGroup, Icon, MenuItem, Text } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';

export function TaskEntry(props) {
    const [trashIntent, setTrashIntent] = useState("none");
    const [openIntent, setOpenIntent] = useState("primary");
    const [handleIntent, setHandleIntent] = useState("none");
    const [descr, setDescr] = useState();

    const { selected, videoHandle, id, handleOpen, handleDelete } = props;

    useEffect(() => {
        if (videoHandle) {
            if (typeof videoHandle === "string") {
                setDescr("../" + videoHandle);
                setHandleIntent("warning");
            } else {
                setDescr("../" + videoHandle.name);
                setHandleIntent("none");
            }
        } else {
            setDescr("Add a video file.");
        }
    }, [videoHandle]);

    return (
        <MenuItem
            onDoubleClick={handleOpen}
            className={"sidebar-menu-entry"}
            icon={<Icon intent={handleIntent} icon="video" />}
            label={
                < div >
                    <ButtonGroup minimal={true}>
                        <Button
                            icon="document-open"
                            intent={openIntent}
                            disabled={!videoHandle}
                            onClick={handleOpen}
                            onMouseEnter={() => { setOpenIntent("success") }}
                            onMouseLeave={() => { setOpenIntent("primary") }} />
                        <Button
                            icon="trash"
                            intent={trashIntent}
                            onClick={handleDelete}
                            onMouseEnter={() => { setTrashIntent("danger") }}
                            onMouseLeave={() => { setTrashIntent("none") }}
                        />
                    </ButtonGroup>
                </div >}
            active={selected === id ? true : false}
            text={
                < Text
                    ellipsize={true} >
                    {descr}
                </Text >
            } />
    );
}