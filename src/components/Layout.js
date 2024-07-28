import React, { useContext, useState } from "react";
import "./Layout.css";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import ControlPanel from "./ControlPanel";
import GlobalUserContext from "../GlobalUserContext";

const Layout = () => {
  const { isPreview, togglePreview } = useContext(GlobalUserContext);

  return (
    <div className="websitebody">
      <nav className="navbar">
        Bob The Builder👩‍💻
        <button className="previewBtn" onClick={togglePreview}>
          {isPreview ? "Edit" : "Preview"}
        </button>
      </nav>
      <div className="container">
        <div
          className="left-panel"
          style={{
            opacity: isPreview ? "0" : "1",
            zIndex: isPreview ? "-1" : "999",
          }}
        >
          <Toolbar />
        </div>
        <div className="canvas-body">
          <Canvas />
        </div>
        <div
          className="right-panel"
          style={{
            opacity: isPreview ? "0" : "1",
            zIndex: isPreview ? "-1" : "999",
          }}
        >
          <ControlPanel />
        </div>
      </div>
    </div>
  );
};

export default Layout;
