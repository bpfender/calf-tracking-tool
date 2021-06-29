import './App.scss';

import React from 'react';

import Player from './components/Player';

function App(props) {
  return (
    <div className="App bp3-dark">
      <header className="App-header">
        <Player></Player>
      </header>
    </div>
  );
}

export default App;