import React from 'react';
import { Callout, Card, MenuDivider } from '@blueprintjs/core';
import "./RightSidebar.scss"

import { Tags } from './Tags';
import { Tasks } from './Tasks';
import { LabelStack } from './LabelStack';


export default function RightSidebar(props) {
    const { annotations, project, projectDispatch, labels, currentFrame } = props;

    // FIXME not sure about getTrack calls way to optimise?
    return (
        <div className={props.className}>
            <Card className="sidebar-panel">
                <Tasks
                    projectDispatch={projectDispatch}
                    tasks={project.tasks}
                    selected={project.selectedTask} />
                <Tags
                    projectDispatch={projectDispatch}
                    labels={labels} />
                <MenuDivider></MenuDivider>
                <LabelStack
                    projectDispatch={projectDispatch}
                    annotations={annotations}
                    labels={labels}
                    currentFrame={currentFrame} />
            </Card>
        </div >
    );
}
