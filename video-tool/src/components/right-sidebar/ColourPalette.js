import React from "react";
import { Button, Card, Icon } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";


export default function ColourPalettePopover(props) {
    const { colour, handleColourClick } = props;

    return (
        <Popover2
            content={<ColourPalette handleColourClick={handleColourClick} />}
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
                        onClick={() => { props.handleColourClick(colour) }}
                        icon={<Icon icon="symbol-square" color={colour}></Icon>}
                        minimal={true}
                    ></Button>
                )
            })}
        </Card>
    );
}