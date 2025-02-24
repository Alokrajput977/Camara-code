import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useNavigate } from "react-router-dom";
import "./CameraDashboard.css";

const serverIP = "192.168.0.119:3001";

const CameraDashboard = () => {
  const [cameras, setCameras] = useState([]);
  const videoRefs = useRef({});
  const prevCamerasRef = useRef([]);
  const navigate = useNavigate();

  // Fetch cameras on mount
  useEffect(() => {
    fetch(`http://${serverIP}/api/cameras`)
      .then((res) => res.json())
      .then((data) => setCameras(data))
      .catch((err) => console.error(err));
  }, []);

  // Toggle full-screen mode for a given element
  const toggleFullScreen = (elem) => {
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Initialize the player when the HLS file is ready.
  const initPlayerWhenReady = (camera) => {
    const videoElement = videoRefs.current[camera.ip];
    if (!videoElement) return;

    const streamUrl = `http://${serverIP}/streams/${camera.folder}/stream.m3u8`;

    const checkStreamAvailability = () => {
      fetch(streamUrl)
        .then((res) => {
          if (res.ok) {
            const player = videojs(videoElement, {
              controls: false, // No extra controls
              autoplay: false, // We'll trigger playback after a delay
              liveui: false,
              fluid: true,
              muted: true,     // Required for autoplay without user interaction
              playsinline: true,
              sources: [
                {
                  src: streamUrl,
                  type: "application/x-mpegURL",
                },
              ],
              techOrder: ["html5"],
              preload: "auto",
              responsive: true,
              aspectRatio: "16:9",
              bigPlayButton: false,
              userActions: {
                click: false,
              },
            });
            videoElement.player = player;
            // Start playback after a 2-second delay
            setTimeout(() => {
              player.play().catch((err) =>
                console.error("Playback error:", err)
              );
            }, 2000);
          } else {
            setTimeout(checkStreamAvailability, 1000);
          }
        })
        .catch(() => setTimeout(checkStreamAvailability, 1000));
    };

    checkStreamAvailability();
  };

  // Initialize players for each camera if not already set.
  useEffect(() => {
    cameras.forEach((camera) => {
      const videoElement = videoRefs.current[camera.ip];
      if (videoElement && !videoElement.player) {
        initPlayerWhenReady(camera);
      }
    });
  }, [cameras]);

  // Dispose players for removed cameras.
  useEffect(() => {
    const prevCams = prevCamerasRef.current;
    const removedCameras = prevCams.filter(
      (prevCam) => !cameras.find((newCam) => newCam.ip === prevCam.ip)
    );
    removedCameras.forEach((camera) => {
      const videoElement = videoRefs.current[camera.ip];
      if (videoElement && videoElement.player) {
        videoElement.player.dispose();
        delete videoRefs.current[camera.ip];
      }
    });
    prevCamerasRef.current = cameras;
  }, [cameras]);

  // Clean up on unmount.
  useEffect(() => {
    return () => {
      Object.keys(videoRefs.current).forEach((key) => {
        const videoElement = videoRefs.current[key];
        if (videoElement && videoElement.player) {
          videoElement.player.dispose();
        }
      });
    };
  }, []);

  const handleRemoveCamera = async (ip) => {
    try {
      await fetch(`http://${serverIP}/api/cameras/${ip}`, {
        method: "DELETE",
      });
      setCameras((prevCameras) => prevCameras.filter((camera) => camera.ip !== ip));
    } catch (error) {
      console.error("Error removing camera:", error);
    }
  };
  
  // Choose a grid layout class based on number of cameras.
  let containerClass = "";
  if (cameras.length === 1) {
    containerClass = "layout-one";
  } else if (cameras.length === 2) {
    containerClass = "layout-two";
  } else if (cameras.length === 4) {
    containerClass = "layout-four";
  } else {
    containerClass = "layout-default";
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button onClick={() => navigate("/")} className="nav-button">
          Add Camera
        </button>
      </header>
      <main className={`camera-grid ${containerClass}`}>
        {cameras.map((camera) => (
          // Attach onDoubleClick to toggle full screen for the camera card.
          <div
            key={camera.ip}
            className="camera-card"
            onDoubleClick={(e) => toggleFullScreen(e.currentTarget)}
          >
            <div className="camera-label">{camera.ip}</div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveCamera(camera.ip)}
            >
              Remove
            </button>
            <video
              ref={(el) => (videoRefs.current[camera.ip] = el)}
              className="video-js vjs-default-skin"
            />
          </div>
        ))}
      </main>
      <footer className="dashboard-footer">
        <p>Copyright © 2025 Sunic. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default CameraDashboard;