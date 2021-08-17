import React from 'react';
import { Labels } from './Labels';

export function LabelStack(props) {
    const { annotationDispatch, annotations, labels } = props;

    console.log(annotations);

    return (
        <div>
            {labels.map(tag =>
                <Labels
                    key={tag}
                    tag={tag}
                    annotations={annotations}
                    annotationDispatch={annotationDispatch} />
            )}
        </div>
    )
}