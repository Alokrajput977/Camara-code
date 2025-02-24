// import React, { useState, useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "./index.css";

// const CameraView = () => {
//     const [privateIp] = useState("localhost");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [cameraIps, setCameraIps] = useState(Array(8).fill(""));
//     const [filteredCameras, setFilteredCameras] = useState([]);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [error, setError] = useState("");
//     const videoRefs = useRef([]);

//     const correctUsername = "admin";
//     const correctPassword = "Ctas@sunic123@";

//     const cameras = [
//         { ip: "10.40.42.30", folder: "hls_cam1" },
//         { ip: "10.40.42.24", folder: "hls_cam2" },
//         { ip: "10.40.42.113", folder: "hls_cam3" },
//         { ip: "10.40.42.114", folder: "hls_cam4" },
//         { ip: "10.40.42.115", folder: "hls_cam5" },
//         { ip: "10.40.42.45", folder: "hls_cam6" },
//         { ip: "10.40.42.32", folder: "hls_cam7" },
//         { ip: "10.40.42.36", folder: "hls_cam8" },
//         { ip: "10.40.42.46", folder: "hls_cam9" },
//         { ip: "10.40.42.76", folder: "hls_cam10" },
//         { ip: "10.40.42.85", folder: "hls_cam11" },
//         { ip: "10.40.42.83", folder: "hls_cam12" },
//         { ip: "10.40.42.86", folder: "hls_cam13" },
//         { ip: "10.40.42.71", folder: "hls_cam14" },
//         { ip: "10.40.42.23", folder: "hls_cam15" },
//         { ip: "10.40.42.20", folder: "hls_cam16" },
//         { ip: "10.40.42.11", folder: "hls_cam17" },
//     ];

//     useEffect(() => {
//         if (!privateIp || !filteredCameras.length) return;

//         filteredCameras.forEach((camera, index) => {
//             if (videoRefs.current[index]) {
//                 videojs(videoRefs.current[index], {
//                     controls: true,
//                     autoplay: true,
//                     fluid: true,
//                     userActions: { doubleClick: false, click: false },
//                     controlBar: { playToggle: false },
//                     sources: [{ src: `http://${privateIp}:3001/${camera.folder}/stream.m3u8`, type: "application/x-mpegURL" }],
//                 });
//             }
//         });
//     }, [privateIp, filteredCameras]);

//     const handleSearch = () => {
//         if (username !== correctUsername || password !== correctPassword) {
//             setError("Invalid username or password. Please try again.");
//             setFilteredCameras([]);
//             setFormSubmitted(false);
//             return;
//         }
//         setError("");
//         const filtered = cameras.filter(cam => cameraIps.includes(cam.ip)).slice(0, cameraIps.filter(ip => ip).length - 1);
//         setFilteredCameras(filtered);
//         setFormSubmitted(filtered.length > 0);
//     };

//     return (
//         <div className="camera-container">
//             {!formSubmitted ? (
//                 <>
//                     <h1 style={{ textAlign: "center", color: "red" }}>Live Camera View</h1>
//                     <div className="inputs-container">
//                         {error && <p className="error-message">{error}</p>}
//                         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" style={{ color: "red", border: "1px solid red" }} />
//                         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ color: "red", border: "1px solid red" }} />
//                         {cameraIps.map((ip, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 placeholder={`Camera IP ${index + 1}`}
//                                 value={cameraIps[index]}  // Ensure correct state binding
//                                 onChange={(e) => {
//                                     const newIps = [...cameraIps];
//                                     newIps[index] = e.target.value;  // Correctly updating the specific index
//                                     setCameraIps(newIps);
//                                 }}
//                                 className="input-field"
//                                 style={{ color: "red", border: "1px solid red" }}
//                             />

//                         ))}
//                         <button onClick={handleSearch} className="search-button" style={{color:"white" ,border:"1px solid red" ,backgroundColor:"red"}}>Search Cameras</button>
//                     </div>
//                 </>
//             ) : (
//                 <div className="camera-frame">
//                     {filteredCameras.map((camera, index) => (
//                         <div key={index} className="camera-video">
//                             <video ref={el => videoRefs.current[index] = el} className="video-js vjs-default-skin" />
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CameraView;







// import React, { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "./index.css";

// const CameraView = () => {
//     const privateIp = "localhost";
//     const videoRefs = useRef([]);

//     const cameras = [


//         { ip: "10.40.42.30", folder: "hls_cam1" },
//         { ip: "10.40.42.24", folder: "hls_cam2" },
//         { ip: "10.40.42.12", folder: "hls_cam3" },
//         { ip: "10.40.42.35", folder: "hls_cam4" },
//         { ip: "10.40.42.41", folder: "hls_cam5" },
//         { ip: "10.40.42.53", folder: "hls_cam6" },
//         { ip: "10.40.42.55", folder: "hls_cam7" },
//         { ip: "10.40.42.81", folder: "hls_cam8" },
//         { ip: "10.40.42.84", folder: "hls_cam9" },
//         { ip: "10.40.42.31", folder: "hls_cam10" },
//         { ip: "10.40.42.83", folder: "hls_cam11" },
//         { ip: "10.40.42.71", folder: "hls_cam12" },
//         { ip: "10.40.42.20", folder: "hls_cam13" },
//         { ip: "10.40.42.33", folder: "hls_cam14" },
//         { ip: "10.40.42.113", folder: "hls_cam15" },
//         { ip: "10.40.42.114", folder: "hls_cam16" }, 
//         { ip: "10.40.42.115", folder: "hls_cam17" }, 

//     ];



//     useEffect(() => {
//         cameras.forEach((camera, index) => {
//             if (videoRefs.current[index]) {
//                 videojs(videoRefs.current[index], {
//                     controls: true,
//                     autoplay: true,
//                     fluid: true,
//                     userActions: { doubleClick: false, click: false },
//                     controlBar: { playToggle: false },
//                     sources: [{ src: `http://${privateIp}:3001/${camera.folder}/stream.m3u8`, type: "application/x-mpegURL" }],
//                 });
//             }
//         });
//     }, []);

//     return (
//         <div className="camera-grid" style={{backgroundColor:"black"}}>
//             {cameras.map((camera, index) => (
//                 <div key={index} className="camera-video">
//                     <video ref={el => videoRefs.current[index] = el} className="video-js vjs-default-skin" />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CameraView;




// import React, { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "./index.css";

// const CameraView = () => {
//     const privateIp = "localhost";
//     const videoRefs = useRef([]);

//     const cameras = [
//         { ip: "10.40.42.24", folder: "hls_cam2" },
//         { ip: "10.40.42.12", folder: "hls_cam3" },
//         { ip: "10.40.42.35", folder: "hls_cam4" },
//         { ip: "10.40.42.41", folder: "hls_cam5" },
//         { ip: "10.40.42.53", folder: "hls_cam6" },
//         { ip: "10.40.42.55", folder: "hls_cam7" },
//         { ip: "10.40.42.81", folder: "hls_cam8" },
//         { ip: "10.40.42.84", folder: "hls_cam9" },
//         { ip: "10.40.42.31", folder: "hls_cam10" },
//         { ip: "10.40.42.83", folder: "hls_cam11" },
//         { ip: "10.40.42.71", folder: "hls_cam12" },
//         { ip: "10.40.42.20", folder: "hls_cam13" },
//         { ip: "10.40.42.33", folder: "hls_cam14" },
//         { ip: "10.40.42.113", folder: "hls_cam15" },
//         { ip: "10.40.42.114", folder: "hls_cam16" },
//         { ip: "10.40.42.115", folder: "hls_cam17" },
//     ];

//     useEffect(() => {
//         cameras.forEach((camera, index) => {
//             if (videoRefs.current[index]) {
//                 videojs(videoRefs.current[index], {
//                     controls: true,
//                     autoplay: true,
//                     fluid: true,
//                     userActions: { doubleClick: false, click: false },
//                     controlBar: { playToggle: false },
//                     html5: { hls: { overrideNative: true } },
//                     sources: [{ src: `http://${privateIp}:3001/${camera.folder}/stream.m3u8`, type: "application/x-mpegURL" }],
//                     techOrder: ["html5"],
//                     preload: "auto",
//                     playbackRates: [0.5, 1, 1.5, 2],
//                     responsive: true,
//                     aspectRatio: "16:9",
//                     height: 2160,
//                     width: 3840
//                 });
//             }
//         });
//     }, []);

//     const handlePTZ = (command) => {
//         fetch(`http://${privateIp}:3001/ptz`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ip: "10.40.42.27", command })
//         })
//         .then(response => response.json())
//         .then(data => console.log("PTZ Response:", data))
//         .catch(error => console.error("PTZ Error:", error));
//     };

//     return (
//         <div className="camera-grid" style={{ backgroundColor: "black" }}>
//             {cameras.map((camera, index) => (
//                 <div key={index} className="camera-video" style={{ maxWidth: "3840px", maxHeight: "2160px", position: "relative" }}>
//                     <video ref={el => videoRefs.current[index] = el} className="video-js vjs-default-skin vjs-big-play-centered" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CameraView;



// new file lates 
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./index.css";

const CameraView = () => {
    const [privateIp, setPrivateIp] = useState("192.168.0.116"); 
    const videoRefs = useRef([]);
    const zoomLevels = Array(17).fill(1);  // Removed unused state setter

    const cameras = [
        { ip: "10.40.42.24", folder: "hls_cam2" },
        { ip: "10.40.42.12", folder: "hls_cam3" },
        { ip: "10.40.42.35", folder: "hls_cam4" },
        { ip: "10.40.42.41", folder: "hls_cam5" },
        // { ip: "10.40.42.53", folder: "hls_cam6" },
        // { ip: "10.40.42.55", folder: "hls_cam7" },
        // { ip: "10.40.42.81", folder: "hls_cam8" },
        // { ip: "10.40.42.84", folder: "hls_cam9" },
        // { ip: "10.40.42.31", folder: "hls_cam10" },
        // { ip: "10.40.42.83", folder: "hls_cam11" },
        // { ip: "10.40.42.71", folder: "hls_cam12" },
        // { ip: "10.40.42.20", folder: "hls_cam13" },
        // { ip: "10.40.42.33", folder: "hls_cam14" },
        // { ip: "10.40.42.113", folder: "hls_cam15" },
        // { ip: "10.40.42.11", folder: "hls_cam16" },
        // { ip: "10.40.42.115", folder: "hls_cam17" },
    ];

    // Fetch the system's private IP address
    useEffect(() => {
        fetch("http://192.168.0.116:3001/api/ip")
            .then((res) => res.json())
            .then((data) => setPrivateIp(data.ip))
            .catch((error) => console.error("Failed to fetch system IP:", error));
    }, []);

    // Initialize Video.js for each camera stream
    useEffect(() => {
        cameras.forEach((camera, index) => {
            if (videoRefs.current[index]) {
                videojs(videoRefs.current[index], {
                    controls: true,
                    autoplay: true,
                    fluid: true,
                    userActions: { doubleClick: false, click: false },
                    controlBar: { playToggle: false },
                    html5: { hls: { overrideNative: true } },
                    sources: [{ 
                        src: `http://${privateIp}:3001/${camera.folder}/stream.m3u8`, 
                        type: "application/x-mpegURL" 
                    }],
                    techOrder: ["html5"],
                    preload: "auto",
                    playbackRates: [0.5, 1, 1.5, 2],
                    responsive: true,
                    aspectRatio: "16:9",
                    height: 2160,
                    width: 3840
                });
            }
        });
    }, [privateIp, cameras]); // Added `cameras` as a dependency

    return (
        <div className="camera-grid" style={{ backgroundColor: "black" }}>
            {cameras.map((camera, index) => (
                <div
                    key={index}
                    className="camera-video"
                    style={{
                        maxWidth: "3840px",
                        maxHeight: "2160px",
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <video
                        ref={el => videoRefs.current[index] = el}
                        className="video-js vjs-default-skin vjs-big-play-centered"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: `scale(${zoomLevels[index]})`,
                            transition: "transform 0.3s ease-in-out",
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default CameraView;