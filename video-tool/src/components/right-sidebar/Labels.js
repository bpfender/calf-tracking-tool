import { Menu } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { LabelEntry } from './LabelEntry';
import { SidebarPanel } from './SidebarPanel';
import { v4 as uuidv4 } from 'uuid';
import { getTrack } from '../annotations/TaskFactory';

export function Labels(props) {
    // TEMPORARY STATES
    const { tag, annotations, projectDispatch, currentFrame } = props;
    //const ids = ["1", "2", "3", "4"];
    const [tagIds, setTagIds] = useState([]);

    useEffect(() => {
        const ids = annotations.tags.get(tag);
        setTagIds(ids ? [...ids] : []);

    }, [annotations, tag])

    /* const getTagIds = () => {
         const ids = annotations.tags.get(tag);
         return ids ? [...ids] : [];
     };*/

    const handleAdd = () => {
        const key = uuidv4();
        projectDispatch({
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
                    {tagIds.map(key =>
                        <LabelEntry
                            key={key}
                            tag={tag}
                            id={key}
                            selected={annotations.selected}
                            track={getTrack(annotations, key)}
                            projectDispatch={projectDispatch}
                            currentFrame={currentFrame} />
                    )}
                </Menu>
            }
            handleAdd={handleAdd} />
    );
}
