import React, { useEffect, useReducer } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-state.js';
import { annotationFactory } from './components/annotations/Annotations';
import { annotationReducer } from './components/state/annotation-state';
import Player from './components/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import SourceSelector from './components/SourceSelector';

// TODO check if React.Fragment is applicabe anywhere
// FIXME https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
// QUESTION do i need to pass down whole state?
export default function App(props) {
  //FIXME totalframes set manually currently
  //FIXME frame count sometimes slightly off
  //FIXME whole tree updates all the time
  //FIXME not quite clear why this is in useRef
  //const annotationsRef = useRef(new Annotations(86302));
  const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);
  const [annotations, annotationDispatch] = useReducer(annotationReducer, annotationFactory(null));



  // FIXME how to make sure annotations are persistent
  useEffect(() => {
    annotationDispatch({
      type: 'SET_TOTAL_FRAME_COUNT',
      payload: { totalFrames: playerState.totalFrames }
    });
  }, [playerState.totalFrames]);


  return (
    <div className="App bp3-dark">
      <header className="App-header">
        <SourceSelector
          fps={playerState.framerate}
          playerDispatch={playerDispatch}>
        </SourceSelector>
      </header>
      <LeftSidebar
        className="left-sidebar">
      </LeftSidebar>
      <Player
        className="main-content"
        playerState={playerState}
        playerDispatch={playerDispatch}
        annotations={annotations}
        annotationDispatch={annotationDispatch}>
      </Player>
      <RightSidebar
        className="right-sidebar"
        playerState={playerState}
        annotations={annotations}
        annotationDispatch={annotationDispatch}>
      </RightSidebar>
      <footer className="footer">FOOTER</footer>
    </div >
  );
}