import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const CameraComponent = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faceData, setFaceData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    async function loadModels() {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
      setIsLoaded(true);
    }
    loadModels();
  }, []);

  useEffect(() => {
    if (isLoaded && webcamRef.current) {
      const id = setInterval(async () => {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        setFaceData(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 100);
      setIntervalId(id);
    }
  }, [isLoaded]);

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  function captureImage() {
    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setImageData(canvas.toDataURL("image/jpeg"));
    setIsImageCaptured(true);
    props.setFileImgUrl(canvas.toDataURL("image/jpeg"));
  }

  return (
    <>
      <div style={{ position: "relative", width: "340px", height: "280px" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={false}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
          width={340}
          height={280}
          videoConstraints={{
            facingMode: "user",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
          width={340}
          height={280}
        ></canvas>
      </div>
      <button
        className="btn btn-primary specia"
        onClick={(e) => {
          e.preventDefault();
          captureImage();
          stopInterval();
        }}
        // disabled={faceData && faceData.length > 0 ? false : true}
      >
        Capture
      </button>
    </>
  );
};

export default CameraComponent;
