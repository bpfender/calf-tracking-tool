import React from 'react';
import { Labels } from './Labels';

export function LabelStack(props) {
    const { projectDispatch, annotations, labels, currentFrame } = props;

    return (
        <div>
            {labels.map(tag =>
                <Labels
                    key={tag}
                    tag={tag}
                    annotations={annotations}
                    projectDispatch={projectDispatch}
                    currentFrame={currentFrame} />
            )}
        </div>
    )
}