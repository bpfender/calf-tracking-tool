import { Button, ButtonGroup, Classes, EditableText, Icon, InputGroup, MenuItem } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import ColourPalettePopover from './ColourPalette';

export function LabelEntry(props) {
    const { id, selected, track, annotationDispatch } = props;

    const [trashIntent, setTrashIntent] = useState("none");
    const [input, setInput] = useState(track.name)

    useEffect(() => {
        setInput(track.name);
    }, [track.name])

    const handleSelect = () => {
        annotationDispatch({
            type: 'SET_SELECTED',
            payload: { key: id }
        });
    };

    const handleIdConfirm = (name) => {
        annotationDispatch({
            type: 'SET_TRACK_NAME',
            payload: {
                key: id,
                name: name,
            }
        });
    };

    const handleColourSelect = (colour) => {
        annotationDispatch({
            type: 'SET_TRACK_COLOUR',
            payload: {
                key: id,
                colour: colour,
            }
        });
    };

    const handleDelete = () => {
        // DELETE TRACK (needs to do it with tags)
    };

    const visibleToggle = () => {
        annotationDispatch({
            type: 'TOGGLE_VISIBLE',
            payload: { key: id },
        });
    };

    return (
        <MenuItem
            icon={<text>id:</text>}
            className="sidebar-menu-entry"
            active={selected === id ? true : false}
            onClick={handleSelect}
            text={
                <EditableText
                    className="sidebar-id-input"
                    value={input}
                    onChange={(e) => { setInput(e) }}
                    onConfirm={handleIdConfirm}
                    selectAllOnFocus={true}
                    confirmOnEnterKey={true}
                />
            }
            label={
                <div>
                    <ButtonGroup
                        minimal={true}>
                        <ColourPalettePopover
                            colour={track.colour}
                            handleColourClick={handleColourSelect}
                        />
                        <Button
                            icon="eye-open"
                            onClick={visibleToggle}
                            intent={track.visible ? "primary" : "none"} />
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