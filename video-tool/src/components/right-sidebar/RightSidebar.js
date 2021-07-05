import React, { useState } from 'react';
import { H5, Button, ButtonGroup, Card, Divider, EditableText, Icon, Menu } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import "./RightSidebar.scss"
import { v4 as uuidv4 } from 'uuid';

export default function RightSidebar(props) {
    const [state, setState] = useState(0);
    const { annotations, annotationDispatch, playerState } = props;

    const [idsList, setIdsList] = useState([]);

    // TODO framecount is hardcoded at the moment
    // QUESTION can i iterate colours with generator?
    const handleAddClick = () => {
        const key = uuidv4();

        annotationDispatch({ type: "ADD_TRACK", payload: { key: key } });

        //FIXME not sure using uuid key for panel items is clever
        setIdsList(idsList.concat(<IDPanel
            annotationDispatch={annotationDispatch}
            removeListComponent={() => removeListComponent()}
            key={key}
            id={key}
        ></IDPanel>));
    }

    const removeListComponent = () => {

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
    const { annotationDispatch, id } = props;
    const [colour, setColour] = useState("#48AFF0")
    const [visible, setVisible] = useState(true);


    const handleTextConfirm = (text) => {
        annotationDispatch({ type: 'SET_TRACK_NAME', payload: { key: id, name: text } });
    }

    const handleTrashClick = () => {
        annotationDispatch({ type: 'DELETE_TRACK', payload: { key: id } });
    }

    // FIXME divider not showing up at the moment
    return (
        <div className="id-panel">
            <Icon icon="dot"></Icon>
            <EditableText
                placeholder="Click to edit..."
                onConfirm={handleTextConfirm}
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
                    onClick={handleTrashClick}
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