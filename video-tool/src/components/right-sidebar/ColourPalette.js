import React from "react";
import { Button, Card, Icon } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { colourPalette } from "../utils";


export default function ColourPalettePopover(props) {
    const { colour, handleColourClick } = props;

    return (
        <Popover2
            content={<ColourPalette handleColourClick={handleColourClick} />}
            interactionKind="click"
            placement="left"
        >
            <Button
                icon={<Icon icon="tint" color={colour}></Icon>}
            ></Button>
        </Popover2>
    );
}

function ColourPalette(props) {
    return (
        <Card className="colour-palette">
            {colourPalette.map((colour) => {
                return (
                    <Button
                        key={colour}
                        onClick={() => { props.handleColourClick(colour) }}
                        icon={<Icon icon="symbol-square" color={colour}></Icon>}
                        minimal={true}
                    ></Button>
                )
            })}
        </Card>
    );
}