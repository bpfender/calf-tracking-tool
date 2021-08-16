import { Menu } from '@blueprintjs/core';
import React from 'react';
import { SidebarPanel } from './SidebarPanel';
import { TaskEntry } from './TaskEntry';

export function Tasks(props) {
    const videos = ["video1", "video2", "video3"];
    const selected = "video1"

    const handleAdd = () => {
        // ADD TAST PROJECT DISPATCH
    };

    return (
        <SidebarPanel
            name="Tasks"
            content={
                <Menu>
                    {videos.map(video => <TaskEntry
                        selected={selected}
                        name={video} />)}
                </Menu>
            }
            handleAdd={handleAdd}
        />
    );
}