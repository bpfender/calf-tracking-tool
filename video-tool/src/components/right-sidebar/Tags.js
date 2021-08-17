import React, { useState } from 'react';
import { EditableText, InputGroup, Tag } from '@blueprintjs/core';
import { SidebarPanel } from './SidebarPanel';

// FIXME auto focus on new tag text input

export function Tags(props) {
    const { projectDispatch, labels } = props;

    const [editableTag, setEditableTag] = useState(null);

    const tag = (content) => {
        return (
            <Tag
                interactive={false}
                minimal={true}
                className="label-tag"
                icon="tag"
                round={true}
                onRemove={() => handleRemove(content)}>
                {content}
            </Tag>
        );
    };

    const handleAdd = (key) => {
        setEditableTag(
            tag(
                <EditableText
                    className="label-tag-editable"
                    onConfirm={handleConfirm}
                    onCancel={resetEditable}
                    confirmOnEnterKey={true}
                    placeholder="Add tag..."
                    maxLength={11}
                    selectAllOnFocus={true} />)
        );
    };

    const handleConfirm = (input) => {
        // TODO check if tag already exists        
        if (input) {
            projectDispatch({
                type: 'ADD_TAG',
                payload: { label: input },
            });
        }

        resetEditable();
    };

    const handleRemove = (key) => {
        // REMOVE TAG DISPATCH
    };

    const resetEditable = () => { setEditableTag(null) };

    return (
        <SidebarPanel
            name="Tags"
            content={
                labels
                    .map((label) => tag(label))
                    .concat(editableTag)
            }
            handleAdd={handleAdd} />
    );
}
