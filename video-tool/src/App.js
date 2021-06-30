import React from 'react';

import Player from './components/Player';
import RightSidebar from './components/RightSidebar';
import LeftSidebar from './components/LeftSidebar';
import './App.scss';


// TODO check if React.Fragment is applicabe anywhere
function App(props) {
  return (
    <div className="App bp3-dark">
      <header className="App-header">VIDEO ANNOTATION TOOL</header>
      <LeftSidebar className="left-sidebar"></LeftSidebar>
      <Player className="main-content"></Player>
      <RightSidebar className="right-sidebar"></RightSidebar>
      <footer className="footer">FOOTER</footer>
    </div >
  );
}

export default App;