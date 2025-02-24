import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CameraInputPage.css"; // Import the CSS file

// Update this to match your backend address (IP:port)
const serverIP = "192.168.0.119:3001";

const CameraInputPage = () => {
  const [ip, setIP] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleAddCamera = () => {
    const trimmedIP = ip.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIP || !trimmedUsername || !trimmedPassword) {
      alert("Please enter IP, username, and password.");
      return;
    }

    fetch(`http://${serverIP}/api/cameras`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ip: trimmedIP,
        username: trimmedUsername,
        password: trimmedPassword,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Error adding camera");
          });
        }
        return res.json();
      })
      .then((newCamera) => {
        navigate("/dashboard");
      })
      .catch((err) => alert(err.message));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <header className="header">
        <h1>Live Camera Portal</h1>
        <button className="toggle-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className="container">
        <div className="card">
          <h2>Add a New Camera</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Camera IP"
              value={ip}
              onChange={(e) => setIP(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button className="btn primary" onClick={handleAddCamera}>
              Add Camera
            </button>
            <button
              className="btn secondary"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p> Copyright © 2025 Sunic. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default CameraInputPage;