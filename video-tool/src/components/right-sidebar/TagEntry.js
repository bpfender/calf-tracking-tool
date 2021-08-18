import { Tag } from '@blueprintjs/core';
import React, { useState } from 'react';

export function TagEntry(props) {
    const [intent, setIntent] = useState('none');

    const { name, handleRemove } = props;

    return (
        <Tag
            intent={intent}
            interactive={false}
            minimal={true}
            className="label-tag"
            icon="tag"
            round={true}
            onMouseEnter={() => { setIntent('danger') }}
            onMouseLeave={() => { setIntent('none') }}
            onRemove={handleRemove}>
            {name}
        </Tag>
    );
}