"use strict" //TODO remove not necesarry but remember about it

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
        <VideoWindow></VideoWindow>
        <VideoInfo></VideoInfo>
      </header>
    </div>
  );
}

class VideoWindow extends React.Component {
  render() {
    return (
      <div className="VideoWindow" >
        <video src={video} type="video/mp4" controls>
          <p>Video not supported</p>
        </video>
      </div >
    )
  }
}

class VideoInfo extends React.Component {
  render() {
    return (
      <div className="VideoInfo">
        <h1>Current time:</h1>
        <h1>Frame number:</h1>
        <h1>Time:</h1>
        <h1>Frame Rate:</h1>
      </div>
    )
  }
}

class VideoControls extends React.Component {
  render() {
    return (
      <div className="VideoControls">
        <PlayPause></PlayPause>
        <FrameForward></FrameForward>
        <FrameBackward></FrameBackward>
        <SkipFramesForward></SkipFramesForward>
        <SkipFramesBackward></SkipFramesBackward>
      </div>
    )
  }
}

class Button extends React.Component {
}

function SeekFrames(props) {
  const framesToSeek = props;
}

class FrameForward extends Button {
}

class FrameBackward extends Button {
}

class SkipFramesForward extends Button {
}

class SkipFramesBackward extends Button {
}

class PlayPause extends Button {
}

class Scrubber extends React.Component {
}

export default App;
