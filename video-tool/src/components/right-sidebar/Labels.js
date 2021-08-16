import { Menu } from '@blueprintjs/core';
import React from 'react';
import { LabelEntry } from './LabelEntry';
import { SidebarPanel } from './SidebarPanel';

export function Labels(props) {
    // TEMPORARY STATES

    const { name } = props;
    const ids = ["1", "2", "3", "4"];

    const handleAdd = () => { };

    return (
        <SidebarPanel
            name={name}
            content={
                <Menu>
                    {ids.map(val => <LabelEntry id={val} />)}
                </Menu>
            }
            handleAdd={handleAdd} />
    );
}
