import React, { useEffect, useReducer, useRef, useState } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-reducer.js';
import Player from './components/video/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import { Header } from './components/header/Header';
import { projectReducer } from './components/state/project-reducer';
import { ProjectFactory } from './components/annotations/ProjectFactory';
import { Helpers } from './components/helpers/Helpers';
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
      playerDispatch({
        type: 'RESET',
      });
    }
  }, [project.selectedTask])

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
    <div
      onKeyDown={(event) => { console.log(event) }}
      className="App bp3-dark">
      <Header
        className="App-header"
        playerState={playerState}
        project={project}
        projectDispatch={projectDispatch}
        playerDispatch={playerDispatch}
        annotations={project.getSelectedTask()}
        canUndo={canUndo}
        canRedo={canRedo} />
      <Player
        canUndo={canUndo}
        canRedo={canRedo}
        className="main-content"
        videoRef={videoRef}
        project={project}
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
        track={project.getSelectedTask().getSelectedTrack()}
        trackKey={project.getSelectedTask().selected}
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
        currentFrame={playerState.currentFrame} />
    </div >
  );
}