import './App.css';
// TODO how to manage dynamic imports?
// QUESTION why is an import required?
import video from './Big_Buck_Bunny_1080_10s_30MB.mp4'

import React from 'react';

function App(props) {
  let subject = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to VAT, {subject}!
        </p>
        <Video></Video>
      </header>
    </div>
  );
}

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  render() {
    return (
      <div>
        <video ref={this.videoRef} width="100%" src={video} type="video/mp4">
          <p>Video not supported</p>
        </video>
        <PlayPause videoRef={this.videoRef}></PlayPause>

      </div >
    )
  }
}

class PlayPause extends React.Component {
  constructor(props) {
    super(props);

    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
  }


  playVideo() {
    this.props.videoRef.current.play();
  }

  pauseVideo() {
    this.props.videoRef.current.pause();
  }

  render() {
    return (
      <div>
        <button onClick={this.playVideo}>PLAY</button>
        <button onClick={this.pauseVideo}>PAUSE</button>
      </div>
    )
  }
}

export default App;