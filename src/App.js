import React from "react";
import { Routes, Route } from "react-router-dom";
import CameraInputPage from "./CameraInputPage";
import CameraDashboard from "./CameraDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CameraInputPage />} />
      <Route path="/dashboard" element={<CameraDashboard />} />
    </Routes>
  );
}

export default App;
