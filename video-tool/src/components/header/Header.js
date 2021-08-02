import { Button, ButtonGroup, Icon } from '@blueprintjs/core';
import React, { useState } from 'react';
import SourceSelector from '../SourceSelector';

export function Header(props) {
    const { framerate, playerDispatch, annotations } = props;

    const [openFile, setOpenFile] = useState("folder-close");

    return (
        <header className={props.className}>

            <ButtonGroup
                minimal={true}>
                <Button icon="document" />
                <Button
                    icon={openFile}
                    onMouseEnter={() => { setOpenFile("folder-open") }}
                    onMouseLeave={() => { setOpenFile("folder-close") }} />
                <Button icon="floppy-disk" />
                <Button icon="export" />
            </ButtonGroup>
            <Icon icon="help"></Icon>



            <SourceSelector
                fps={framerate}
                playerDispatch={playerDispatch}
                annotations={annotations}>
            </SourceSelector>

        </header>

    );
}