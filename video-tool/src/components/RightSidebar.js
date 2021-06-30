import React, { useState } from 'react';
import { Button, ButtonGroup, Divider, EditableText, Icon } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import "./RightSidebar.scss"


export default function RightSidebar(props) {
    return (
        <div className="right-sidebar">
            <h1>Sidebar Right</h1>
            <IDPanel></IDPanel>
        </div>
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
    const { colour } = props;
    return (
        <Popover2
            content={<ColourPalette></ColourPalette>}
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
    const [pick, setPick] = useState();
    // Colours from https://blueprintjs.com/docs/#core/colors
    const colours = [
        "#48AFF0", "#3DCC91", "#FFB366",
        "#FF7373", "#FF6E4A", "#FF66A1",
        "#C274C2", "#AD99FF", "#669EFF",
        "#2EE6D6", "#62D96B", "#FFC940"]

    return (
        <div class="colour-palette">
            {colours.map((colour) => {
                return (
                    <Button
                        onClick={() => { setPick(colour) }}
                        icon={<Icon icon="symbol-square" color={colour}></Icon>}
                        minimal={true}
                    ></Button>
                )
            })}
        </div>
    );
}