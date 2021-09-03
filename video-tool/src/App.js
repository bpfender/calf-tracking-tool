import React, { useEffect, useReducer, useRef, useState } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-reducer.js';
import { annotationReducer } from './components/state/task-reducer';
import Player from './components/video/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import { Header } from './components/header/Header';
import { projectReducer } from './components/state/project-reducer';
import { getCurrentTask, getTask, ProjectFactory } from './components/annotations/ProjectFactory';
import { TaskFactory } from './components/annotations/TaskFactory';
import { Helpers } from './components/helpers/Helpers';
import { Divider } from '@blueprintjs/core';
import { useUndo } from './components/state/useUndo';

// TODO check if React.Fragment is applicabe anywhere
// FIXME https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
//FIXME whole tree updates all the time
export default function App(props) {
  // const [project, projectDispatch] = useReducer(projectReducer, ProjectFactory());
  const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);

  const [undoableProject, projectDispatch, canUndo, canRedo] = useUndo(projectReducer, ProjectFactory());
  const [project, setProject] = useState(undoableProject.current);

  useEffect(() => {
    console.log(undoableProject);
    setProject(undoableProject.current);
  }, [undoableProject])

  const videoRef = useRef(null);
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
    console.log('MEDIA', playerState.mediaTime);
    console.log('CURRENT', playerState.currentTime);
  }, [playerState.currentFrame])

  useEffect(() => {
    if (playerState.totalFrames) {
      projectDispatch({
        type: 'SET_TOTAL_FRAME_COUNT',
        payload: { totalFrames: playerState.totalFrames }
      });
    }
  }, [playerState.totalFrames]);

  useEffect(() => {
    if (project.selectedTask) {
      /*projectDispatch({
        type: 'LOAD_TASK',
        payload: { task: project.getCurrentTask() },
      });*/

      playerDispatch({
        type: 'RESET',
      });
    }

    // console.log(project.getSelectedTask());

  }, [project.selectedTask])

  // When selected task updates, this also needs to be update in project state
  /* useEffect(() => {
     if (project.selectedTask) {
       projectDispatch({
         type: 'UPDATE_TASK',
         payload: { task: annotations }
       });
     }
   }, [annotations])*/

  const currentVideoHandle = project.getSelectedTask().videoHandle;

  useEffect(() => {
    if (currentVideoHandle) {
      (async function () {
        try {
          const video = await currentVideoHandle.getFile();

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
  }, [currentVideoHandle]);



  return (
    <div className="App bp3-dark">
      <Header
        className="App-header"
        project={project}
        projectDispatch={projectDispatch}
        playerDispatch={playerDispatch}
        annotations={project.getSelectedTask()}
        canUndo={canUndo}
        canRedo={canRedo} />
      <Player
        className="main-content"
        videoRef={videoRef}
        playerState={playerState}
        playerDispatch={playerDispatch}
        annotations={project.getSelectedTask()}
        projectDispatch={projectDispatch} />
      <Helpers
        className="helpers"
        framerate={playerState.framerate}
        src={playerState.src}
        duration={playerState.duration}
        projectDispatch={projectDispatch}
        keyframes={project.getSelectedTask().keyframes}
        reviewed={project.getSelectedTask().reviewed}
        playerVidRef={videoRef}
        currentFrame={playerState.currentFrame}
        paused={playerState.paused} />

      <RightSidebar
        className="right-sidebar"
        playerState={playerState}
        annotations={project.getSelectedTask()}
        projectDispatch={projectDispatch}
        project={project}
        labels={project.tags}
        currentFrame={playerState.currentFrame}
      />
    </div >
  );
}