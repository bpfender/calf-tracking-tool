import React, { useState } from 'react';
import { H5, Button, MenuItem } from '@blueprintjs/core';
import { v4 as uuidv4 } from 'uuid';
import "./RightSidebar.scss"
import IdPanel from './IdPanel';


export default function RightSidebar(props) {
    const [state, setState] = useState(0);
    const { annotations, annotationDispatch, playerState } = props;

    const [idsList, setIdsList] = useState([]);
    console.log(idsList);

    // TODO framecount is hardcoded at the moment
    // QUESTION can i iterate colours with generator?
    const handleAddClick = () => {
        const key = uuidv4();
        annotationDispatch({ type: "ADD_TRACK", payload: { key: key } });
        setIdsList(idsList.concat(key));
    }

    const removeListComponent = (filterKey) => {
        setIdsList(idsList.filter(key => key !== filterKey));
    }

    return (
        <div className="right-sidebar">
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
                        removeListComponent={() => { removeListComponent(key) }}
                    ></IdPanel>
                ))}

            </div>
        </div >
    );
}


