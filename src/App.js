import * as React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import VideoCam from "./components/VideoCam";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />

      <Route exact path="/capture" element={<VideoCam />} />
    </Routes>
  );
}

export default App;
