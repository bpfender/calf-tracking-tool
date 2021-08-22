import React, { useEffect, useReducer } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-reducer.js';
import { annotationReducer } from './components/state/annotation-reducer';
import Player from './components/video/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import { Header } from './components/header/Header';
import { projectReducer } from './components/state/project-reducer';
import { getCurrentTask, getTask, ProjectFactory } from './components/annotations/ProjectFactory';
import { TaskFactory } from './components/annotations/TaskFactory';

// TODO check if React.Fragment is applicabe anywhere
// FIXME https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
//FIXME whole tree updates all the time
// TODO https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
export default function App(props) {
  const [project, projectDispatch] = useReducer(projectReducer, ProjectFactory());

  const [annotations, annotationDispatch] = useReducer(annotationReducer, getCurrentTask(project));
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

  }, [project])

  useEffect(() => {
    if (playerState.totalFrames) {
      annotationDispatch({
        type: 'SET_TOTAL_FRAME_COUNT',
        payload: { totalFrames: playerState.totalFrames }
      });
    }
  }, [playerState.totalFrames]);

  useEffect(() => {
    if (project.selectedTask) {
      annotationDispatch({
        type: 'LOAD_TASK',
        payload: { task: getCurrentTask(project) },
      });

      playerDispatch({
        type: 'RESET',
      });
    }
  }, [project.selectedTask])

  // When selected task updates, this also needs to be update in project state
  useEffect(() => {
    if (project.selectedTask) {
      projectDispatch({
        type: 'UPDATE_TASK',
        payload: { task: annotations }
      });
    }
  }, [annotations])


  useEffect(() => {
    if (annotations.videoHandle) {
      (async function () {
        try {
          const video = await annotations.videoHandle.getFile();

          playerDispatch({
            type: 'SRC_CHANGE',
            payload: {
              src: URL.createObjectURL(video),
              filename: video.name,
            }
          });
        } catch (error) {
          // No error handling, if can't getFile, then videoHandle isn't yet set
        }
      })();
    }
  }, [annotations.videoHandle]);



  return (
    <div className="App bp3-dark">
      <Header
        className="App-header"
        project={project}
        projectDispatch={projectDispatch}
        playerDispatch={playerDispatch}
        annotations={annotations} />
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
        annotationDispatch={annotationDispatch}
        project={project}
        projectDispatch={projectDispatch}
        labels={project.labels}
      />
      <footer className="footer" />
    </div >
  );
}