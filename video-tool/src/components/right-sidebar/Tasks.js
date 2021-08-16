import { Button, ButtonGroup, Icon, Menu, MenuItem, Text } from '@blueprintjs/core';
import React from 'react';
import { SidebarPanel } from './SidebarPanel';
import { TaskEntry } from './TaskEntry';

export function Tasks(props) {
    const videos = ["video1", "video2", "video3"];
    const selected = "video1"

    const task = (name, selected) =>
        <MenuItem
            className="sidebar-menu-entry"
            icon="video"
            label={
                <div>
                    <ButtonGroup minimal={true}>
                        <Button
                            icon="document-open"
                            intent="primary" />
                        <Button
                            icon="trash"
                        />
                    </ButtonGroup>
                </div>}
            active={selected === name ? true : false}
            intent={selected === name ? "none" : "none"}
            text={
                <Text
                    ellipsize={true} >
                    {"../" + name}
                </Text>
            } />

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