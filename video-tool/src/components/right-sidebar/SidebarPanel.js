import { Button, Collapse, Icon } from '@blueprintjs/core';
import React, { useState } from 'react';

export function SidebarPanel(props) {
    const { name, content, handleAdd } = props;

    const [expand, setExpand] = useState(true);

    const handleClick = () => {
        if (!expand) {
            setExpand(true);
        }

        handleAdd();
    }

    return (
        <div>
            <div className="sidebar-header">
                <h4
                    onClick={() => { setExpand(!expand) }}>
                    <Icon
                        icon={expand ? "caret-down" : "caret-right"}
                    />
                    {name}
                </h4>
                <Button
                    icon="add"
                    minimal={true}
                    onClick={handleClick} />
            </div>
            <Collapse
                isOpen={expand}>
                {content}
            </Collapse>
        </div>
    );
}