import { Icon } from '@blueprintjs/core';
import React from 'react';
import { Labels } from './Labels';

export function LabelStack(props) {
    const tags = ["cow", "farmer", "trough"];

    return (
        <div>
            {tags.map(val => <Labels name={val} />)}
        </div>
    )
}