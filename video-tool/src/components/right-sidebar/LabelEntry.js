import { Button, ButtonGroup, Classes, EditableText, Icon, InputGroup, MenuItem } from '@blueprintjs/core';
import React, { useState } from 'react';
import ColourPalettePopover from './ColourPalette';

export function LabelEntry(props) {
    const { id } = props;

    // TEMPORARY STATES
    const [visible, setVisible] = useState("true");
    const [trashIntent, setTrashIntent] = useState("none");

    const handleSelect = () => { };
    const handleIdConfirm = () => { };
    const handleColour = () => { };
    const visibleToggle = () => { setVisible(!visible) };

    return (
        <MenuItem
            icon={<text>id:</text>}
            className="sidebar-menu-entry"
            text={
                <div className="sidebar-id-input">
                    <InputGroup
                        intent="none"
                        small={true}
                        value={id} />
                </ div >
            }
            label={
                <div>
                    <ButtonGroup
                        minimal={true}>
                        <ColourPalettePopover />
                        <Button
                            onClick={visibleToggle}
                            intent={visible ? "primary" : "none"}
                            icon="eye-open" />
                        <Button
                            icon="trash"
                            intent={trashIntent}
                            onMouseEnter={() => { setTrashIntent("danger") }}
                            onMouseLeave={() => { setTrashIntent("none") }} />
                    </ButtonGroup>
                </div >
            } />
    );
}