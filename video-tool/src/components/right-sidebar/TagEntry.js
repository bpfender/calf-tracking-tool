import { Tag } from '@blueprintjs/core';
import React, { useState } from 'react';

export function TagEntry(props) {
    const { name, handleRemove } = props;

    return (
        <Tag
            interactive={false}
            minimal={true}
            className="label-tag"
            icon="tag"
            round={true}
            onRemove={handleRemove}>
            {name}
        </Tag>
    );
}