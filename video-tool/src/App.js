import React from 'react';
import './App.scss';

import Player from './components/Player';
import RightSidebar from './components/right-sidebar/RightSidebar';
import LeftSidebar from './components/left-sidebar/LeftSidebar';
import Annotations from './components/annotations/Annotations';

// TODO check if React.Fragment is applicabe anywhere
function App(props) {
  const annotations = new Annotations();

  return (
    <div className="App bp3-dark">
      <header className="App-header">VIDEO ANNOTATION TOOL</header>
      <LeftSidebar
        className="left-sidebar">
      </LeftSidebar>
      <Player
        className="main-content"
        annotations={annotations}>
      </Player>
      <RightSidebar
        className="right-sidebar"
        annotations={annotations}>
      </RightSidebar>
      <footer className="footer">FOOTER</footer>
    </div >
  );
}

export default App;