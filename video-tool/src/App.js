import './App.css';
<<<<<<< HEAD
=======
// TODO how to manage dynamic imports?
// QUESTION why is an import required?
import video from './24fps.mp4'
>>>>>>> a39c84a5b8060f16df6c5a58c8d6def5d4072657

import React from 'react';


<<<<<<< HEAD
import Player from './components/Player';



=======
>>>>>>> a39c84a5b8060f16df6c5a58c8d6def5d4072657
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

<<<<<<< HEAD
=======


// QUESTION can we update videoRef before render to avoid null ref?
class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.getCurrentTime = this.getCurrentTime.bind(this);

    this.state = { time: '', framerate: '' };


  }

  getCurrentTime() {
    let newStream = new MediaStream(this.videoRef.current.captureStream());
    this.setState({ time: this.videoRef.current.currentTime })
    console.log(this.state.time);
    let track = newStream.getVideoTracks()[0];
    this.setState({ framerate: track.getSettings().frameRate });
    console.log(this.state.framerate);

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
        <FrameNavigation
          videoRef={this.videoRef}
          videoFramerate={24}
        >
        </FrameNavigation>
        <VideoInfo
          videoRef={this.videoRef}
          videoTime={this.state.time}
          videoFramerate={24}>
        </VideoInfo>

      </div >
    )
  }
}

class VideoInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>Time: {this.props.videoTime}</h2>
        <h2>Frame: {this.props.videoTime * this.props.videoFramerate}</h2>
        <h2>Framerate: {this.props.videoFramerate} </h2>
      </div>
    )
  }

}

class FrameNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.nextFrame = this.nextFrame.bind(this);
    this.previousFrame = this.previousFrame.bind(this);

  }

  nextFrame() {
    this.props.videoRef.current.currentTime += 1 / this.props.videoFramerate;
  }

  previousFrame() {
    this.props.videoRef.current.currentTime -= 1 / this.props.videoFramerate;
  }

  render() {
    return (
      <div>
        <button onClick={this.nextFrame}>NEXT FRAME</button>
        <button onClick={this.previousFrame}>PREV FRAME</button>
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

>>>>>>> a39c84a5b8060f16df6c5a58c8d6def5d4072657
export default App;