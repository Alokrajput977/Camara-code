// CameraDashboard.js
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./index.css";

// Static list of available cameras
const allCameras = [
  { ip: "10.40.42.24", folder: "hls_cam2" },
    { ip: "10.40.42.12", folder: "hls_cam3" },
    { ip: "10.40.42.35", folder: "hls_cam4" },
    { ip: "10.40.42.41", folder: "hls_cam5" },
];

const CameraDashboard = () => {
  // State variables for selected cameras, new IP input, dark mode, and current time
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [newIP, setNewIP] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Backend server IP for streaming
  const serverIP = "192.168.0.116";

  // Ref object to hold video element references (keyed by camera IP)
  const videoRefs = useRef({});

  // Ref to store previous selected cameras for cleanup
  const prevSelectedCamerasRef = useRef([]);

  // Update current time every second in Asia/Kolkata timezone
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour12: true,
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      const timeStr = new Intl.DateTimeFormat("en-IN", options).format(now);
      setCurrentTime(timeStr);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Video.js players for each selected camera
  useEffect(() => {
    selectedCameras.forEach((camera) => {
      const videoElement = videoRefs.current[camera.ip];
      if (videoElement && !videoElement.player) {
        const player = videojs(videoElement, {
          controls: true,
          autoplay: true,
          fluid: true,
          sources: [{
            src: `http://${serverIP}:3001/${camera.folder}/stream.m3u8`,
            type: "application/x-mpegURL"
          }],
          techOrder: ["html5"],
          preload: "auto",
          playbackRates: [0.5, 1, 1.5, 2],
          responsive: true,
          aspectRatio: "16:9"
        });
        videoElement.player = player;
      }
    });
  }, [selectedCameras, serverIP]);

  // Cleanup: Dispose players for cameras removed from selectedCameras
  useEffect(() => {
    const prevCameras = prevSelectedCamerasRef.current;
    const removedCameras = prevCameras.filter(prevCam =>
      !selectedCameras.find(newCam => newCam.ip === prevCam.ip)
    );
    removedCameras.forEach(camera => {
      const videoElement = videoRefs.current[camera.ip];
      if (videoElement && videoElement.player) {
        videoElement.player.dispose();
        delete videoRefs.current[camera.ip];
      }
    });
    prevSelectedCamerasRef.current = selectedCameras;
  }, [selectedCameras]);

  // Cleanup all players on component unmount
  useEffect(() => {
    return () => {
      Object.keys(videoRefs.current).forEach(key => {
        const videoElement = videoRefs.current[key];
        if (videoElement && videoElement.player) {
          videoElement.player.dispose();
        }
      });
    };
  }, []);

  // Handler for saving a new camera IP
  const handleSaveIP = () => {
    const trimmedIP = newIP.trim();
    if (!trimmedIP) return;
    const foundCamera = allCameras.find(camera => camera.ip === trimmedIP);
    if (!foundCamera) {
      alert("Camera not found. Please enter a valid camera IP.");
      return;
    }
    if (selectedCameras.find(cam => cam.ip === foundCamera.ip)) {
      alert("Camera already added.");
      return;
    }
    setSelectedCameras(prev => [...prev, foundCamera]);
    setNewIP("");
  };

  // Determine grid layout style based on the number of cameras added
  const getGridStyle = () => {
    const count = selectedCameras.length;
    if (count === 1) {
      return { gridTemplateColumns: "1fr" };
    } else if (count === 2) {
      return { gridTemplateColumns: "1fr 1fr" };
    } else if (count === 3) {
      return { gridTemplateColumns: "1fr 1fr 1fr" };
    } else if (count === 4) {
      return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
    } else if (count === 5 || count === 6) {
      return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(3, 1fr)" };
    } else {
      return { gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" };
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : "light"}`}>
      <header className="dashboard-header">
        <h1>Live Camera View</h1>
        <div className="header-controls">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <div className="current-time">{currentTime}</div>
        </div>
      </header>
      <section className="ip-input-section">
        <input
          type="text"
          placeholder="Enter Camera IP"
          value={newIP}
          onChange={(e) => setNewIP(e.target.value)}
          className="ip-input"
        />
        <button onClick={handleSaveIP} className="save-button">
          Save IP
        </button>
      </section>
      <section className="camera-grid" style={getGridStyle()}>
        {selectedCameras.map((camera) => (
          <div key={camera.ip} className="camera-video">
            <p className="camera-label">{camera.ip}</p>
            <video
              ref={(el) => (videoRefs.current[camera.ip] = el)}
              className="video-js vjs-default-skin vjs-big-play-centered"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default CameraDashboard;
