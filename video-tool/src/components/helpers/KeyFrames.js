import React, { useEffect, useRef, useState } from 'react';
import { bmvbhash } from 'blockhash-core';
import { Button, ProgressBar } from '@blueprintjs/core';
import { getTimeAsFrames } from '../video/video-functions';
import { hammingDistance } from '../utils';
import { keyframeButtonStates, keyframeProgressStates, keyframeReadyState } from './keyframeStates';

//FIXME load video and remove?

const HAMMING_THRESHOLD = 5;
const FRAME_SKIP = 5;

export function KeyFrames(props) {
  const { framerate, src, duration } = props;

  const [readyState, setReadyState] = useState(keyframeReadyState.ready);
  const [buttonState, setButtonState] = useState(keyframeButtonStates.waiting);
  const [progressState, setProgressState] = useState(keyframeProgressStates.ready);


  const [videoTime, setVideoTime] = useState(0);
  const [buttonText, setButtonText] = useState("Detect keyframes");

  const rateAverage = useRef({ mean: 1, count: 0 });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const keyframesRef = useRef([]);

  const width = 400;
  const height = 300

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext('2d');
  }, [])

  useEffect(() => {
    if (src && framerate > 0) {
      console.log(framerate);
      videoRef.current.load();
      videoRef.current.requestVideoFrameCallback(
        (now, metadata) => { hashingCallback(metadata) })
    }
  }, [src, framerate]);

  const handleDetectClick = () => {
    rateAverage.current = { mean: 1, count: 0 };
    videoRef.current.play();
  };

  const handleEnded = () => {
    setButtonState(keyframeButtonStates.done);
    setProgressState(keyframeProgressStates.done);

    videoRef.current.pause();
    console.log(keyframesRef.current);
  };

  const handleTimeUpdate = () => {
    setButtonState(keyframeButtonStates.processing());
    setProgressState(keyframeProgressStates.processing());

    setVideoTime(videoRef.current.currentTime);
    setButtonText(formatTime(calculateTimeRemaining(videoRef.current.currentTime)))
  };

  const hashingCallback = (metadata, prevHash = null, prevFrame = 1) => {
    const currFrame = getTimeAsFrames(metadata.mediaTime, framerate);

    contextRef.current.drawImage(videoRef.current, 0, 0, width, height)
    const imageData = contextRef.current.getImageData(0, 0, width, height);
    const nextHash = bmvbhash(imageData, 16);

    if (prevHash) {
      const hamming = hammingDistance(prevHash, nextHash);
      if (hamming > HAMMING_THRESHOLD) {
        keyframesRef.current.push(currFrame);
        console.log(videoRef.current.playbackRate, currFrame, hamming);
      }
    }

    if (currFrame - prevFrame > FRAME_SKIP &&
      videoRef.current.playbackRate !== 0) {
      videoRef.current.playbackRate -= 0.2;
    } else if (currFrame - prevFrame < FRAME_SKIP &&
      videoRef.current.playbackRate !== 16) {
      videoRef.current.playbackRate += 0.2;
    }

    videoRef.current.requestVideoFrameCallback(
      (now, metadata) => {
        hashingCallback(metadata, nextHash, currFrame);
      })
  };



  const calculateTimeRemaining = (currentTime) => {
    const remain = duration - currentTime;

    const average = rateAverage.current.mean;
    const count = rateAverage.current.count;

    const newAverage = (average * count + videoRef.current.playbackRate) / (count + 1);

    rateAverage.current.mean = newAverage;
    rateAverage.current.count++;

    return remain / newAverage;
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const h = date.getUTCHours();
    const m = date.getUTCMinutes() + h * 60;
    const s = date.getUTCSeconds();

    return [m, s]
      .map(e => e < 10 ? `0${e}` : `${e}`)
      .join(':');
  };

  const handleMouseEnter = () => {
    switch (readyState) {
      case keyframeReadyState.processing:
        setButtonState(keyframeButtonStates.cancel);
        break;
      case keyframeReadyState.done:
        setButtonState(keyframeButtonStates.reset);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = () => {
    switch (readyState) {
      case keyframeReadyState.processing:
        //TODO add
        setButtonState(keyframeButtonStates.processing())
        break;
      case keyframeReadyState.done:
        setButtonState(keyframeButtonStates.done);
        break;
      default:
        break;
    }
  };

  return (
    <div className="keyframes">
      <Button
        icon={buttonState.icon}
        intent={buttonState.intent}
        disabled={buttonState.disabled}
        text={buttonState.text}
        onClick={handleDetectClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <ProgressBar
        animate={progressState.animate}
        intent={progressState.intent}
        value={progressState.value} />


      <div
        hidden={true}>
        <video
          width={width}
          height={height}
          ref={videoRef}
          src={src ? src : null}
          onCanPlayThrough={() => { }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded} />
        <canvas
          width={width}
          height={height}
          ref={canvasRef} />
      </div>
    </div >
  );
}


/*const { videoRef, framerate } = props;
const [ready, setReady] = useState(false);

const cv = useRef(null);

// https://betterprogramming.pub/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
useEffect(() => {
  const script = document.createElement('script');
  script.src = "./opencv4_5_3.js";
  script.async = 'true';
  script.onload = (() => { setReady(true) });
  document.body.appendChild(script);

  return (() => {
    document.body.removeChild(script);
  })
}, [])

useEffect(() => {
  cv.current = window.cv;
}, [ready])*/