import React, { useReducer } from 'react';
import './App.scss';
import { defaultPlayerState, playerReducer } from './components/state/player-state.js';
import Player from './components/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import Annotations from './components/annotations/Annotations';

// TODO check if React.Fragment is applicabe anywhere
// FIXME https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
// QUESTION do i need to pass down whole state?
function App(props) {
  //FIXME totalframes set manually currently
  //FIXME frame count sometimes slightly off
  const annotations = new Annotations(86302);
  const [playerState, playerDispatch] = useReducer(playerReducer, defaultPlayerState);

  return (
    <div className="App bp3-dark">
      <header className="App-header">VIDEO ANNOTATION TOOL</header>
      <LeftSidebar
        className="left-sidebar">
      </LeftSidebar>
      <Player
        className="main-content"
        playerState={playerState}
        playerDispatch={playerDispatch}
        annotations={annotations}>
      </Player>
      <RightSidebar
        className="right-sidebar"
        playerState={playerState}
        annotations={annotations}>
      </RightSidebar>
      <footer className="footer">FOOTER</footer>
    </div >
  );
}

export default App;