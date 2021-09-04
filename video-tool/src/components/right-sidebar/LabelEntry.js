import { Button, ButtonGroup, Divider, EditableText, MenuItem } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import ColourPalettePopover from './ColourPalette';

export function LabelEntry(props) {
    const { id, tag, selected, track, projectDispatch, currentFrame } = props;

    const [trashIntent, setTrashIntent] = useState("none");
    const [input, setInput] = useState(track.name)

    const labelCut = !track.getLabel(currentFrame);

    useEffect(() => {
        setInput(track.name);
    }, [track.name])

    const handleSelect = () => {
        projectDispatch({
            type: 'SET_SELECTED',
            payload: { key: id }
        });
    };

    const handleIdConfirm = (name) => {
        projectDispatch({
            type: 'SET_TRACK_NAME',
            payload: {
                key: id,
                name: name,
            }
        });
    };

    const handleCut = () => {
        if (labelCut) {
            projectDispatch({
                type: 'INSERT_LABEL',
                payload: {
                    key: id,
                    frame: currentFrame,
                }
            });
        } else {
            projectDispatch({
                type: 'CUT_LABEL',
                payload: {
                    key: id,
                    frame: currentFrame,
                }
            })
        }
    }

    const handleColourSelect = (colour) => {
        projectDispatch({
            type: 'SET_TRACK_COLOUR',
            payload: {
                key: id,
                colour: colour,
            }
        });
    };

    const handleDelete = () => {
        projectDispatch({
            type: 'DELETE_TRACK',
            payload: {
                key: id,
                tag: tag,
            }
        });
    };

    const visibleToggle = () => {
        projectDispatch({
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
                        <Button
                            icon="cut"
                            onClick={handleCut}
                            intent={labelCut ? "danger" : "none"}
                        />
                        <Divider />
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
                            onClick={handleDelete}
                            intent={trashIntent}
                            onMouseEnter={() => { setTrashIntent("danger") }}
                            onMouseLeave={() => { setTrashIntent("none") }} />
                    </ButtonGroup>
                </div >
            } />
    );
}