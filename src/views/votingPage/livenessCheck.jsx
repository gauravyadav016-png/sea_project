import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { async } from 'q';

const LivenessCheck = (props) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [detectionReady, setDetectionReady] = useState(false);
  const [liveness, setLiveness] = useState(null);

  useEffect(() => {
    loadModels();
    startCamera();
  }, []);

  const loadModels=async()=>{

    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        
      ]);
      //faceapi.nets.handDetector.loadFromUri('/models'),
      console.log("loaded here");
      setDetectionReady(true);
    };


  const startCamera = async () => {
    const videoEl = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoEl.srcObject = stream;
    videoEl.play();
    setCameraReady(true);
    // checkLiveness();
    // loadModels();
  };

  function stopCamera() {
    // Stop all tracks in the stream
    const videoEl = document.getElementById('video');
    // Stop all tracks in the original stream
    const stream = videoEl.srcObject;
    const tracks = stream.getTracks();
    const recorder = new MediaRecorder(stream);
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
    
    tracks.forEach(track => {
      if (track.kind === 'video') {
        track.stop();
      }
    });
    // Clear the srcObject property of the video element to stop displaying the stream
    videoEl.srcObject = null;
  }

  const checkLiveness = async () => {
    console.log("checking checkLiveness function");
    const videoEl = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    
    //Hand detection code starts
    // const displaySize = { width: videoEl.width, height: videoEl.height};
    // const handdetections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withHandLandmarks()
    // const resizedDetections = faceapi.resizeResults(handdetections, displaySize) 
    // detectHandRising(resizedDetections.handLandmarks[0], resizedDetections.faceLandmarks)
    //Hand detection code ends
    
    const detection = await faceapi.detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const detectectAllFaces = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const faceCount = detectectAllFaces.length;
    console.log("Total Faces:",faceCount);
    
    if (!detection && faceCount!==1) {
      setLiveness(false);
      return;
    }
    const { landmarks, expressions } = detection;
    const resizedLandmarks = faceapi.resizeResults(landmarks, videoEl);
    const faceDescriptor = await faceapi.computeFaceDescriptor(videoEl, resizedLandmarks);
  
     console.log("Expression Happy ",expressions.happy);
    // console.log(faceDescriptor);
    // console.log(detection)
    if (expressions.happy > 0.8) {
      setLiveness(true);
      props.onHandleLivenessStatus(true);
      // stopCamera();
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      // });
      // const tracks = stream.getTracks();
      // tracks.forEach(track => track.stop());

      setCameraReady(false);
      // const context = canvas.getContext('2d');
      // context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      return;
    }else{
      setLiveness(false);
      props.onHandleLivenessStatus(false);
    }
    
  };


  // Detect if the hand is rising or falling
  // function detectHandRising(handLandmarks, faceLandmarks) {
  //   console.log("checking here",handLandmarks);
  //   const handY = handLandmarks[0].y - faceLandmarks[0].nose.y // Calculate the position of the hand relative to the face
  //   const previousHandY = detectHandRising.previousHandY || handY // Store the previous hand position
  //   const direction = handY - previousHandY // Calculate the direction of movement
  //   if (direction < 0) {
  //     console.log('Hand is rising')
  //   }
  //   detectHandRising.previousHandY = handY // Update the previous hand position
  // };

  return (
    <div className='two-divs'>
      <video id="video" width="320" height="280"></video>
      {/* <button onClick={startCamera}>Start Camera</button> */}
      {cameraReady && detectionReady && (
         <div className='liveness-div'>
          <div className='liveness-in'>
             <button className='btn-grn' onClick={checkLiveness}>Check Liveness</button>
             <p><strong>Note:</strong> ! Please Smile, While checking Liveness</p>
           </div>
        </div> 
      )}
      {liveness !== null && (
        <div className='live-message'>
          {liveness ? (
            <p className='success'>Liveness check passed!</p>
          ) : (
            <p className='error'>Liveness check failed. Please try again.</p>
          )}
          {/* <canvas id="canvas" width="320" height="240"></canvas> */}
        </div>
      )}
    </div>
  );
};

export default LivenessCheck;
