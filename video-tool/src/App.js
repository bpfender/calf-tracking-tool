import React, { useEffect, useReducer, useState } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-state.js';
import { TaskFactory } from './components/annotations/TaskFactory';
import { annotationReducer } from './components/state/annotation-state';
import Player from './components/video/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import { Header } from './components/header/Header';
import { get } from 'idb-keyval';
import { projectReducer } from './components/state/project-reducer';
import { ProjectFactory } from './components/annotations/ProjectFactory';

// TODO check if React.Fragment is applicabe anywhere
// FIXME https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
// QUESTION do i need to pass down whole state?
//FIXME whole tree updates all the time
// TODO https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
export default function App(props) {
  const [parentDir, setParentDir] = useState(null);

  const [project, projectDispatch] = useReducer(projectReducer, null);

  const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);
  const [annotations, annotationDispatch] = useReducer(annotationReducer, TaskFactory(null));

  // Check whether VAT directory has been set before
  /* useEffect(() => {
     (async function () {
       const parentDir = await get('parentDir');
       if (parentDir) {
         setParentDir(parentDir);
       }
     })();
   }, [])*/

  // FIXME how to make sure annotations are persistent
  useEffect(() => {
    annotationDispatch({
      type: 'SET_TOTAL_FRAME_COUNT',
      payload: { totalFrames: playerState.totalFrames }
    });
  }, [playerState.totalFrames]);

  return (
    <div className="App bp3-dark">
      <Header
        className="App-header"
        project={project}
        projectDispatch={projectDispatch}
        playerDispatch={playerDispatch} />
      <LeftSidebar
        className="left-sidebar" />
      <Player
        className="main-content"
        playerState={playerState}
        playerDispatch={playerDispatch}
        annotations={annotations}
        annotationDispatch={annotationDispatch}
        projectDispatch={projectDispatch} />
      <RightSidebar
        className="right-sidebar"
        playerState={playerState}
        annotations={annotations}
        annotationDispatch={annotationDispatch} />
      <footer className="footer" />
    </div >
  );
}