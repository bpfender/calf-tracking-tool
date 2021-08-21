import React, { useEffect, useRef, useState } from 'react';
import { bmvbhash } from 'blockhash-core';
import { Button, ProgressBar } from '@blueprintjs/core';
import { getTimeAsFrames } from '../video/video-functions';
import { hammingDistance } from '../utils';
import { keyframeButtonStates, keyframeProgressStates, keyframeState } from './keyframeStates';

//FIXME load video and remove?

const HAMMING_THRESHOLD = 5;
const FRAME_SKIP = 5;

// TODO handle error

export function KeyFrames(props) {
  const { framerate, src, annotationDispatch } = props;

  const [state, setState] = useState(keyframeState.waiting);
  const [buttonState, setButtonState] = useState(keyframeButtonStates.waiting);
  const [progressState, setProgressState] = useState(keyframeProgressStates.ready);

  const rateAverage = useRef(null);

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
    if (src && framerate) {
      videoRef.current.load();
      videoRef.current.requestVideoFrameCallback(
        (now, metadata) => { hashingCallback(metadata) })
    }

    // Initialise these values
    rateAverage.current = { mean: 1, count: 0 };

  }, [src, framerate]);

  useEffect(() => {
    console.log(state);
    switch (state) {
      case keyframeState.waiting:
        setButtonState(keyframeButtonStates.waiting);
        setProgressState(keyframeProgressStates.ready);
        break;
      case keyframeState.ready:
        setButtonState(keyframeButtonStates.ready);
        setProgressState(keyframeProgressStates.ready);
        break;
      case keyframeState.processing:

        break;
      case keyframeState.cancel:
        setButtonState(keyframeButtonStates.cancel);
        break;
      case keyframeState.done:
        setButtonState(keyframeButtonStates.done);
        setProgressState(keyframeProgressStates.done);
        break;
      case keyframeState.reset:
        setButtonState(keyframeButtonStates.reset);
        setProgressState(keyframeProgressStates.done);
        break;

      default:
        throw new Error("Unrecognised keyframe state");
    }
  }, [state])

  const handleClick = async () => {
    if (state === keyframeState.ready) {
      setState(keyframeState.processing);
      await videoRef.current.play();
    } else if (state === keyframeState.cancel ||
      state === keyframeState.reset) {
      videoRef.current.load();
      setState(keyframeState.waiting);
    }
  };

  const handleMouseEnter = () => {
    if (state === keyframeState.processing) {
      setState(keyframeState.cancel);
    } else if (state === keyframeState.done) {
      setState(keyframeState.reset);
    }
  };

  const handleMouseLeave = () => {
    if (state === keyframeState.cancel) {
      setState(keyframeState.processing);
    } else if (state === keyframeState.reset) {
      setState(keyframeState.done);
    }
  };

  const handleTimeUpdate = () => {
    switch (state) {
      case keyframeState.waiting: {
        setState(keyframeState.ready);
        break;
      }
      case keyframeState.processing: {
        const remaining = formatTime(getTimeRemaining());
        const progress = getProgress();
        setButtonState(keyframeButtonStates.processing(remaining));
        setProgressState(keyframeProgressStates.processing(progress));
        break;
      }
      case keyframeState.cancel: {
        const progress = getProgress();
        setProgressState(keyframeProgressStates.processing(progress));
        break;
      }
      default: {
        //throw new Error("Unknow keyframe state");
      }
    }
  };

  const handleEnded = () => {
    setState(keyframeState.done);

    annotationDispatch({
      type: 'SET_KEYFRAMES',
      payload: { keyframes: keyframesRef.current }
    });

    videoRef.current.pause();
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
      videoRef.current.playbackRate > 0.4) {
      videoRef.current.playbackRate -= 0.2;
    } else if (currFrame - prevFrame < FRAME_SKIP &&
      videoRef.current.playbackRate < 16) {
      videoRef.current.playbackRate += 0.2;
    }

    videoRef.current.requestVideoFrameCallback(
      (now, metadata) => {
        hashingCallback(metadata, nextHash, currFrame);
      })
  };

  const getTimeRemaining = () => {
    const remain = videoRef.current.duration - videoRef.current.currentTime;

    const average = rateAverage.current.mean;
    const count = rateAverage.current.count;

    const newAverage = (average * count + videoRef.current.playbackRate) / (count + 1);

    rateAverage.current.mean = newAverage;
    rateAverage.current.count++;

    return remain / newAverage;
  };

  const getProgress = () => {
    return videoRef.current.currentTime / videoRef.current.duration;
  }

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const h = date.getUTCHours();
    const m = date.getUTCMinutes() + h * 60;
    const s = date.getUTCSeconds();

    return [m, s]
      .map(e => e < 10 ? `0${e}` : `${e}`)
      .join(':');
  };



  return (
    <div className="keyframes">
      <Button
        icon={buttonState.icon}
        intent={buttonState.intent}
        disabled={buttonState.disabled}
        text={buttonState.text}
        onClick={handleClick}
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