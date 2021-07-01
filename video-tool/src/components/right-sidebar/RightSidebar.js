import React, { useState } from 'react';
import { H5, Button, ButtonGroup, Card, Divider, EditableText, Icon, Menu } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import "./RightSidebar.scss"


export default function RightSidebar(props) {
    const { annotations } = props.annotations;

    const [idsList, setIdsList] = useState([]);

    const handleAddClick = (event) => {
        setIdsList(idsList.concat(<IDPanel></IDPanel>));
    }

    return (
        <div className="right-sidebar">
            <div className="right-panel">
                <H5>Sidebar Right</H5>
                <Button icon="add"
                    onClick={handleAddClick}
                ></Button>
                {idsList}
            </div>
        </div >
    );
}

function IDPanel(props) {
    const [colour, setColour] = useState("#48AFF0")
    const [visible, setVisible] = useState(true);

    // FIXME divider not showing up at the moment
    return (
        <div className="id-panel">
            <Icon icon="dot"></Icon>
            <EditableText
                placeholder="Click to edit..."
                onConfirm={() => { }}
                maxLength={16}
                selectAllOnFocus={true}
            ></EditableText>
            <Divider></Divider>
            <ButtonGroup
                minimal={true}>
                <ColourPalettePopover colour={colour}></ColourPalettePopover>
                <Button
                    onClick={() => { setVisible(visible ? false : true) }}
                    intent={visible ? "primary" : "none"}
                    icon="eye-open"
                ></Button>
                <Button
                    icon="trash"
                ></Button>
            </ButtonGroup >

        </div >
    );
}

function ColourPalettePopover(props) {
    const [colour, setColour] = useState(props.colour);
    return (
        <Popover2
            content={<ColourPalette setColour={setColour} />}
            interactionKind="click"
            placement="bottom"
        >
            <Button
                icon={<Icon icon="tint" color={colour}></Icon>}
            ></Button>
        </Popover2>
    );
}

function ColourPalette(props) {
    const { setColour } = props;

    // Colours from https://blueprintjs.com/docs/#core/colors
    // FIXME probably define as static?
    const colours = [
        "#48AFF0", "#3DCC91", "#FFB366",
        "#FF7373", "#FF6E4A", "#FF66A1",
        "#C274C2", "#AD99FF", "#669EFF",
        "#2EE6D6", "#62D96B", "#FFC940"]

    return (
        <Card class="colour-palette">
            {colours.map((colour) => {
                return (
                    <Button
                        onClick={() => { setColour(colour) }}
                        icon={<Icon icon="symbol-square" color={colour}></Icon>}
                        minimal={true}
                    ></Button>
                )
            })}
        </Card>
    );
}