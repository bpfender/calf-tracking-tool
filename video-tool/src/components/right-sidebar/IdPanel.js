import React, { useState } from 'react';
import { Button, ButtonGroup, Divider, EditableText, Icon } from '@blueprintjs/core';
import ColourPalettePopover from "./ColourPalette";


export default function IdPanel(props) {
    const { annotationDispatch, id } = props;
    const [colour, setColour] = useState("#48AFF0")
    const [visible, setVisible] = useState(true);


    const handleTextConfirm = (text) => {
        annotationDispatch({ type: 'SET_TRACK_NAME', payload: { key: id, name: text } });
    }

    const handleTrashClick = () => {
        annotationDispatch({ type: 'DELETE_TRACK', payload: { key: id } });
        props.removeListComponent();
    }

    // FIXME divider not showing up at the moment
    return (
        <div className="id-panel">
            <Icon icon="dot"></Icon>
            <EditableText
                placeholder="Click to edit..."
                onConfirm={handleTextConfirm}
                maxLength={16}
                selectAllOnFocus={true}
            ></EditableText>
            <Divider></Divider>
            <ButtonGroup
                minimal={true}>
                <ColourPalettePopover colour={colour}></ColourPalettePopover>
                <Button
                    onClick={() => { setVisible(visible ? false : true) }}
                    intent={visible ? "primary" : "none"}
                    icon="eye-open"
                ></Button>
                <Button
                    onClick={handleTrashClick}
                    icon="trash"
                ></Button>
            </ButtonGroup >

        </div >
    );
}