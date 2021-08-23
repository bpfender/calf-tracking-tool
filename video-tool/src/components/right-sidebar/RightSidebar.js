import React, { useEffect, useState } from 'react';
import { H5, Button, Card, MenuDivider } from '@blueprintjs/core';
import { v4 as uuidv4 } from 'uuid';
import "./RightSidebar.scss"
import IdPanel from './IdPanel';
import { getTrack } from '../annotations/TaskFactory';
import { Tags } from './Tags';
import { Tasks } from './Tasks';
import { LabelStack } from './LabelStack';


export default function RightSidebar(props) {
    //const labels = ["cow", "farmer", "truck"];

    const [idsList, setIdsList] = useState([]);
    const { annotations, project, projectDispatch, labels } = props;

    useEffect(() => {
        setIdsList([...annotations.tracks.keys()]);
    }, [annotations.tracks])

    const handleAddClick = () => {
        const key = uuidv4();
        projectDispatch({
            type: "ADD_TRACK",
            payload: { key: key }
        });
        setIdsList(idsList.concat(key));
    }

    const removeListComponent = (filterKey) => {
        projectDispatch({
            type: 'DELETE_TRACK',
            payload: { key: filterKey }
        });
        setIdsList(idsList.filter(key => key !== filterKey));
    }

    // FIXME not sure about getTrack calls way to optimise?
    return (
        <div className={props.className}>
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
                labels={labels} />
        </div >
    );
}


/*
<Card className="right-panel">
<H5>Sidebar Right</H5>
<Button icon="add"
    onClick={handleAddClick}
></Button>
{idsList.map(key => (
    <IdPanel
        key={key}
        id={key}
        projectDispatch={projectDispatch}
        selectedId={annotations.selected}
        visible={getTrack(annotations, key).visible}
        colour={getTrack(annotations, key).colour}
        removeListComponent={() => { removeListComponent(key) }}
    ></IdPanel>
))}
</Card>
*/