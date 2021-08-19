import { Menu } from '@blueprintjs/core';
import React from 'react';
import { SidebarPanel } from './SidebarPanel';
import { TaskEntry } from './TaskEntry';

export function Tasks(props) {
    const { projectDispatch, tasks, selected } = props;

    console.log(tasks);


    const handleAdd = () => {
        projectDispatch({
            type: 'ADD_TASK'
        })
    };

    const handleOpen = (key) => {
        projectDispatch({
            type: 'SET_SELECTED_TASK',
            payload: { key: key },
        });
    }

    const handleDelete = (key) => {
        projectDispatch({
            type: 'REMOVE_TASK',
            payload: { key: key },
        });
    }

    return (
        <SidebarPanel
            name="Tasks"
            content={
                <div>
                    <Menu>
                        {tasks
                            .entrySeq()
                            .map(([key, value]) =>
                                <TaskEntry
                                    key={key}
                                    id={key}
                                    selected={selected}
                                    handleOpen={() => { handleOpen(key) }}
                                    handleDelete={() => { handleDelete(key) }}
                                    videoHandle={value.videoHandle} />
                            )
                        }
                    </Menu>
                </div>
            }
            handleAdd={handleAdd} />
    );
}

/*
const videos = ["video1", "video2", "video3"];

<Menu>
{videos.map(video => <TaskEntry
    key={video}
    selected={selected}
    name={video} />)}
</Menu>*/