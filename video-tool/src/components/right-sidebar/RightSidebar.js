import React, { useEffect, useState } from 'react';
import { H5, Button } from '@blueprintjs/core';
import { v4 as uuidv4 } from 'uuid';
import "./RightSidebar.scss"
import IdPanel from './IdPanel';
import { getTrack } from '../annotations/TaskFactory';

export default function RightSidebar(props) {
    const [idsList, setIdsList] = useState([]);
    const { annotations, annotationDispatch } = props;

    useEffect(() => {
        setIdsList([...annotations.tracks.keys()]);
    }, [annotations.tracks])

    const handleAddClick = () => {
        const key = uuidv4();
        annotationDispatch({
            type: "ADD_TRACK",
            payload: { key: key }
        });
        // setIdsList(idsList.concat(key));
    }

    const removeListComponent = (filterKey) => {
        annotationDispatch({
            type: 'DELETE_TRACK',
            payload: { key: filterKey }
        });
        // setIdsList(idsList.filter(key => key !== filterKey));
    }

    // FIXME not sure about getTrack calls way to optimise?
    return (
        <div className={props.className}>
            <div className="right-panel">
                <H5>Sidebar Right</H5>
                <Button icon="add"
                    onClick={handleAddClick}
                ></Button>
                {idsList.map(key => (
                    <IdPanel
                        key={key}
                        id={key}
                        annotationDispatch={annotationDispatch}
                        selectedId={annotations.selected}
                        visible={getTrack(annotations, key).visible}
                        colour={getTrack(annotations, key).colour}
                        removeListComponent={() => { removeListComponent(key) }}
                    ></IdPanel>
                ))}
            </div>
        </div >
    );
}


