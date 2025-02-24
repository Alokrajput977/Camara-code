import React from "react";

const CameraView = () => {
  return (
    <div style={{ display: "flex" }}>
      <iframe
        src="http://localhost:3001/camera1"
        width="50%"
        height="100vh"
        title="Camera 1"
      ></iframe>
      <iframe
        src="http://localhost:3001/camera2"
        width="50%"
        height="100vh"
        title="Camera 2"
      ></iframe>
    </div>
  );
};

export default CameraView;
