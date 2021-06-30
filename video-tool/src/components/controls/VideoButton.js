import React from 'react';
import { Button } from '@blueprintjs/core';

export default function VideoButton(props) {
    const { icon, onClick } = props;

    return (
        <Button>
            icon={icon}
            onClick={onClick}
        </Button>
    );
}