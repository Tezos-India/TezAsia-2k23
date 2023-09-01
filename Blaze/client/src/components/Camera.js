import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Camera = ({ setFileImg2 }) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  const capturePhoto = React.useCallback(
    async (e) => {
      e.preventDefault();
      const imageSrc = webcamRef.current.getScreenshot();
      //   voterData.current_picture = url;
      setUrl(imageSrc);

      console.log(imageSrc);
      //convert this imageSrc(base64) to imageFile
      const imageFile = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(imageSrc);
      });
      //   // console.log(imageFile);
      //   setVoterData({
      //     ...voterData,
      //     current_picture: imageFile,
      //   });
      setFileImg2(imageFile);
      // console.log(imageFile);
    },
    [webcamRef]
  );

  useEffect(() => {
    // setVoterData({
    //   ...voterData,
    //   current_picture: url,
    // });
    setFileImg2(url);
  }, [url]);
  const onUserMedia = (e) => {
    // console.log(e);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          mirrored={false}
          style={{
            width: "100%",
            height: "auto",
            border: "1px solid #000",
            borderRadius: "5px",
          }}
        />
        <button className="main-btn ml-30" onClick={capturePhoto}>
          Capture
        </button>
        <button
          className="main-btn ml-30"
          onClick={(e) => {
            e.preventDefault();
            setUrl(null);
          }}
        >
          Refresh
        </button>
      </div>
      <div>
        {url ? (
          <img
            src={url}
            alt="Screenshot"
            style={{
              width: "100%",
              height: "auto",
              border: "1px solid #000",
              borderRadius: "5px",
              marginLeft: "0.3rem",
            }}
          />
        ) : (
          <span className="m-auto text-center">Your Pic will be below 👇</span>
        )}
      </div>
    </div>
  );
};

export default Camera;
