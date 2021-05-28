import './App.css';

import React from 'react';

import Player from './components/Player';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to VAT!
        </p>
        <Player></Player>
      </header>
    </div>
  );
}

export default App;