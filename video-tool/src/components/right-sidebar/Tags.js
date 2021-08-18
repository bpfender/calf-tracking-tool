import React, { useState } from 'react';
import { EditableText, InputGroup, Tag } from '@blueprintjs/core';
import { SidebarPanel } from './SidebarPanel';
import { TagEntry } from './TagEntry';

// FIXME auto focus on new tag text input

export function Tags(props) {
    const { projectDispatch, labels } = props;

    const [editableTag, setEditableTag] = useState(null);

    const handleAdd = (key) => {
        setEditableTag(
            <TagEntry
                key="editable"
                name={
                    <EditableText
                        className="label-tag-editable"
                        onConfirm={handleConfirm}
                        onCancel={resetEditable}
                        confirmOnEnterKey={true}
                        placeholder="Add tag..."
                        maxLength={11}
                        selectAllOnFocus={true} />
                }
                handleRemove={() => { setEditableTag(null) }}
            />
        );
    };

    const handleConfirm = (input) => {
        if (input && !labels.includes(input)) {
            projectDispatch({
                type: 'ADD_TAG',
                payload: { label: input },
            });
        }

        resetEditable();
    };

    // FIXME doesn't yet remove tag ids from tasks
    const handleRemove = (label) => {
        projectDispatch({
            type: 'REMOVE_TAG',
            payload: { label: label }
        });
        // REMOVE TAG DISPATCH
    };

    const resetEditable = () => { setEditableTag(null) };

    return (
        <SidebarPanel
            name="Tags"
            content={
                labels
                    .map((label) =>
                        <TagEntry
                            key={label}
                            name={label}
                            handleRemove={() => { handleRemove(label) }} />
                    )
                    .concat(editableTag)
            }
            handleAdd={handleAdd} />
    );
}
