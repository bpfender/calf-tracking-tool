import React from 'react';
import { Button, ButtonGroup, Divider, EditableText, Icon } from '@blueprintjs/core';
import ColourPalettePopover from "./ColourPalette";


export default function IdPanel(props) {
    const { annotationDispatch, removeListComponent, id, colour, visible } = props;

    const handleTextConfirm = (text) => {
        annotationDispatch({ type: 'SET_TRACK_NAME', payload: { key: id, name: text } });
    }

    const handleTrashClick = () => {
        annotationDispatch({ type: 'DELETE_TRACK', payload: { key: id } });
        removeListComponent();
    }

    const handleColourClick = (colour) => {
        annotationDispatch({
            type: 'SET_TRACK_COLOUR',
            payload: { key: id, colour: colour }
        })
    }

    const handleVisibleToggle = () => {
        annotationDispatch({
            type: 'TOGGLE_VISIBLE',
            payload: { key: id }
        });
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
                <ColourPalettePopover
                    colour={colour}
                    handleColourClick={handleColourClick}>
                </ColourPalettePopover>
                <Button
                    onClick={handleVisibleToggle}
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