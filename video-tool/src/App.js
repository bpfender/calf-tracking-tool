import './App.css';

import React from 'react';

import Player from './components/Player';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Player></Player>
      </header>
    </div>
  );
}

export default App;