import { Menu } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { LabelEntry } from './LabelEntry';
import { SidebarPanel } from './SidebarPanel';
import { v4 as uuidv4 } from 'uuid';
import { getTrack } from '../annotations/TaskFactory';

export function Labels(props) {
    // TEMPORARY STATES
    const { tag, annotations, annotationDispatch } = props;
    const ids = ["1", "2", "3", "4"];

    const getTagIds = () => {
        const ids = annotations.tags.get(tag);
        return ids ? [...ids] : [];
    };

    useEffect(() => {
        console.log("hello");
        console.log("HELLO", annotations.tags);
    })

    const handleAdd = () => {
        const key = uuidv4();
        annotationDispatch({
            type: 'ADD_TRACK',
            payload: {
                key: key,
                tag: tag,
            }
        });
    };

    return (
        <SidebarPanel
            name={tag}
            content={
                <Menu>
                    {getTagIds().map(key =>
                        <LabelEntry
                            key={key}
                            id={key}
                            selected={annotations.selected}
                            track={getTrack(annotations, key)}
                            annotationDispatch={annotationDispatch} />
                    )}
                </Menu>
            }
            handleAdd={handleAdd} />
    );
}
