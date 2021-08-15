import React, { useEffect, useReducer } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-state.js';
import { annotationReducer } from './components/state/annotation-state';
import Player from './components/video/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import { Header } from './components/header/Header';
import { projectReducer } from './components/state/project-reducer';
import { getCurrentTask, ProjectFactory } from './components/annotations/ProjectFactory';

// TODO check if React.Fragment is applicabe anywhere
// FIXME https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
// QUESTION do i need to pass down whole state?
//FIXME whole tree updates all the time
// TODO https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
export default function App(props) {
  const [project, projectDispatch] = useReducer(projectReducer, ProjectFactory());
  const [annotations, annotationDispatch] = useReducer(annotationReducer, null);

  const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);

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
    if (playerState.totalFrames) {
      annotationDispatch({
        type: 'SET_TOTAL_FRAME_COUNT',
        payload: { totalFrames: playerState.totalFrames }
      });
    }
  }, [playerState.totalFrames]);

  useEffect(() => {
    console.log("PROJECT SELECTED EFFECT");
    if (project.selectedTask) {
      annotationDispatch({
        type: 'LOAD_TASK',
        payload: { task: getCurrentTask(project) },
      });
    }
  }, [project.selectedTask])

  // When selected task updates, this also needs to be update in project state
  useEffect(() => {
    console.log("UPDATE TASK EFFECT");
    if (project.selectedTask) {
      projectDispatch({
        type: 'UPDATE_TASK',
        payload: { task: annotations }
      });
    }
  }, [annotations])

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