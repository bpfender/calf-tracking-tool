import React, { useEffect, useRef, useState } from 'react';
import { bmvbhash } from 'blockhash-core';
import { ProgressBar, Slider } from '@blueprintjs/core';

export function KeyFrames(props) {
  const { framerate, src, duration } = props;

  const [videoTime, setVideoTime] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

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


  const hashingCallback = (metadata, prevHash = null, prevFrame = 1) => {
    contextRef.current.drawImage(videoRef.current, 0, 0, width, height)
    const imageData = contextRef.current.getImageData(0, 0, width, height);

    const nextHash = bmvbhash(imageData, 16);
    let hamming = null;
    if (prevHash) {
      hamming = hammingDistance(prevHash, nextHash);
    }

    const currFrame = metadata.mediaTime * framerate;
    if (currFrame - prevFrame > 5) {
      videoRef.current.playbackRate -= 0.2;
    } else if (currFrame - prevFrame < 2) {
      // Avoid error if rate set too high
      if (videoRef.current.playbackRate !== 16) {
        videoRef.current.playbackRate += 0.2;
      }
    }

    if (hamming > 5) {
      console.log(videoRef.current.playbackRate, currFrame, hamming);
    }

    videoRef.current.requestVideoFrameCallback(
      (now, metadata) => {
        hashingCallback(metadata, nextHash, currFrame);
      })
  };


  /* Calculate the hamming distance for two hashes in hex format */
  // https://github.com/commonsmachinery/blockhash-js/blob/master/index.js
  const hammingDistance = (hash1, hash2) => {
    const one_bits = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];

    let d = 0;

    if (hash1.length !== hash2.length) {
      throw new Error("Can't compare hashes with different length");
    }

    for (let i = 0; i < hash1.length; i++) {
      let n1 = parseInt(hash1[i], 16);
      let n2 = parseInt(hash2[i], 16);
      d += one_bits[n1 ^ n2];
    }
    return d;
  };

  const calculateKeyframes = () => { };

  return (
    <div>
      <ProgressBar
        intent="primary"
        value={videoTime / duration}
      />
      <div
        hidden={true}>
        <video
          width={width}
          height={height}
          ref={videoRef}
          src={src ? src : null}
          onCanPlayThrough={() => { videoRef.current.play() }}
          onTimeUpdate={() => { setVideoTime(videoRef.current.currentTime) }}
          onEnded />
        <canvas
          width={width}
          height={height}
          ref={canvasRef} />
      </div>
    </div>
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