import { Button, Collapse, H4, Icon } from '@blueprintjs/core';
import React, { useState } from 'react';

export function SidebarPanel(props) {
    const { name, content, handleAdd, disabled } = props;
    const [expand, setExpand] = useState(true);
    const [intent, setIntent] = useState("none");

    const handleClick = () => {
        if (!expand) {
            setExpand(true);
        }

        handleAdd();
    }

    return (
        <div>
            <div className="sidebar-header">
                <H4
                    onClick={() => { setExpand(!expand) }}>
                    <Icon
                        icon={expand ? "caret-down" : "caret-right"}
                    />
                    {name}
                </H4>
                <Button
                    icon="add"
                    intent={intent}
                    disabled={disabled || false}
                    onMouseEnter={() => { setIntent("primary") }}
                    onMouseLeave={() => { setIntent("none") }}
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