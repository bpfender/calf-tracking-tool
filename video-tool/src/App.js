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

// QUESTION can we update videoRef before render to avoid null ref?
class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.getCurrentTime = this.getCurrentTime.bind(this);

    this.state = { time: '' };


  }

  getCurrentTime() {
    let newStream = new MediaStream(this.videoRef.current.captureStream());
    this.setState({ time: this.videoRef.current.currentTime })
    console.log(this.state.time);
    let track = newStream.getVideoTracks()[0];
    let settings = track.getSettings();
    console.log(settings.frameRate);

  }


  render() {
    return (
      <div>
        <video ref={this.videoRef} onTimeUpdate={this.getCurrentTime} width="100%" src={video} type="video/mp4">
          <p>Video not supported</p>
        </video>
        <PlayPause
          videoRef={this.videoRef}
          getTime={this.getCurrentTime}>
        </PlayPause>
        <VideoInfo
          videoRef={this.videoRef}
          videoTime={this.state.time}>

        </VideoInfo>

      </div>
    )
  }
}

class VideoInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>Time: {this.props.videoTime}</h2>
        <h2>Frame:</h2>
        <h2>Framerate:</h2>
      </div>
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
    this.props.getTime(); // Sync time on display on pause
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