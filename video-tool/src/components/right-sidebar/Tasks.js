import { Menu } from '@blueprintjs/core';
import React from 'react';
import { SidebarPanel } from './SidebarPanel';
import { TaskEntry } from './TaskEntry';

export function Tasks(props) {
    const { projectDispatch, tasks, selected } = props;

    console.log(selected);
    const videos = ["video1", "video2", "video3"];

    const handleAdd = () => {
        projectDispatch({
            type: 'ADD_TASK'
        });
    };

    return (
        <SidebarPanel
            name="Tasks"
            content={
                <div>
                    <Menu>
                        {videos.map(video => <TaskEntry
                            key={video}
                            selected={selected}
                            name={video} />)}
                    </Menu>
                    <Menu>
                        {tasks
                            .map((value, key) =>
                                <TaskEntry
                                    key={key}
                                    id={key}
                                    selected={selected}
                                    name={value.videoHandle.name} />
                            )
                            .concat([])
                        }
                    </Menu>
                </div>
            }
            handleAdd={handleAdd}
        />
    );
}