import { Button, ButtonGroup, MenuItem, Text } from '@blueprintjs/core';
import React, { useState } from 'react';

export function TaskEntry(props) {
    const [trashIntent, setTrashIntent] = useState("none");

    const { selected, name } = props;

    return (
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
                            intent={trashIntent}
                            onMouseEnter={() => { setTrashIntent("danger") }}
                            onMouseLeave={() => { setTrashIntent("none") }}
                        />
                    </ButtonGroup>
                </div>}
            active={selected === name ? true : false}
            text={
                <Text
                    ellipsize={true} >
                    {"../" + name}
                </Text>
            } />
    );
}