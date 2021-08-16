import React from 'react';
import { Button, ButtonGroup, Divider, EditableText, Icon } from '@blueprintjs/core';
import ColourPalettePopover from "./ColourPalette";

// FIXME possible to move annotation state here?
export default function IdPanel(props) {
    const { annotationDispatch, id, colour, visible, selectedId } = props;

    const handleSelectClick = () => {
        annotationDispatch({
            type: "SET_SELECTED",
            payload: { key: id }
        })
    }

    const handleTextConfirm = (text) => {
        annotationDispatch({
            type: 'SET_TRACK_NAME',
            payload: { key: id, name: text }
        });
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
            <div>
                <Icon
                    icon="dot"
                    intent={selectedId === id ? "primary" : "none"}
                    onClick={handleSelectClick}
                ></Icon>
                <EditableText
                    placeholder="Click to edit..."
                    onEdit={handleSelectClick}
                    onConfirm={handleTextConfirm}
                    maxLength={16}
                    selectAllOnFocus={true}
                ></EditableText>
            </div>

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
                    onClick={props.removeListComponent}
                    icon="trash"
                ></Button>
            </ButtonGroup >

        </div >
    );
}