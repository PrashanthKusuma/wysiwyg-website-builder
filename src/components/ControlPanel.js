import React, { useContext, useState } from "react";
import GlobalUserContext from "../GlobalUserContext";

const ControlPanel = () => {
  const { handleFocus, components, setComponents, focus, isPreview } =
    useContext(GlobalUserContext);
  const [imageWidth, setImageWidth] = useState("100");
  const [txt, setTxt] = useState("");

  const showImageControls = (obj) => {
    const handleImageWidthChange = (e, obj) => {
      setImageWidth(e.target.value);
      components.find((e) => e.id === obj.id).properties.width = imageWidth;
      setComponents([...components]);
    };
    return (
      <>
        <div>
          <div className="fields">
            <label htmlFor="size">Size</label>
            <input
              type="range"
              min="1"
              max="100"
              id="size"
              value={imageWidth}
              onChange={(e) => handleImageWidthChange(e, obj)}
              className="range-input"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              width: "75px",
              height: "40px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "#fff",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "5px",
              padding: "0 7px",
            }}
            onClick={() => {
              setComponents(components.filter((e) => e.id !== obj.id));
              handleFocus();
            }}
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </>
    );
  };
  const showTextControls = (obj) => {
    function setText(e, obj) {
      components.find((e) => e.id === obj.id).properties.txt = e.target.value;
      setComponents([...components]);
    }
    function setBackground(e, obj) {
      components.find((e) => e.id === obj.id).properties.backgroundColor =
        e.target.value;
      setComponents([...components]);
    }
    function setTextColor(e, obj) {
      components.find((e) => e.id === obj.id).properties.textColor =
        e.target.value;
      setComponents([...components]);
      console.log(components);
    }
    return (
      <>
        <div>
          <div className="fields">
            <label htmlFor="txt">Inner Text</label>
            <input
              type="text"
              id="txt"
              value={components.find((e) => e.id === obj.id).properties.txt}
              onChange={(e) => setText(e, obj)}
              className="txtBox"
            />
          </div>
          <div className="fields">
            <label htmlFor="bg">Background</label>
            <input
              type="color"
              id="bg"
              value={
                components.find((e) => e.id === obj.id).properties
                  .backgroundColor
              }
              onChange={(e) => setBackground(e, obj)}
            />
          </div>

          <div className="fields">
            <label htmlFor="clr">Text Color</label>
            <input
              type="color"
              id="clr"
              value={
                components.find((e) => e.id === obj.id).properties.textColor
              }
              onChange={(e) => setTextColor(e, obj)}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "75px",
              height: "40px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "#fff",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "5px",
              padding: "0 7px",
              margin: "20px 0",
              right: "0",
            }}
            onClick={() => {
              setComponents(components.filter((e) => e.id !== obj.id));
              handleFocus();
            }}
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </>
    );
  };
  const showInputControls = (obj) => {
    function setText(e, obj) {
      components.find((e) => e.id === obj.id).properties.placeholder = e.target.value;
      setComponents([...components]);
    }
    function setDisabled(e, obj){
      components.find((e) => e.id === obj.id).properties.disabled = e.target.checked;
      setComponents([...components]);
      console.log(components)
    }
    return (
      <>
        <div>
          <div className="fields">
            <label htmlFor="placeholder">Placeholder</label>
            <input
              type="text"
              id="placeholder"
              value={components.find((e) => e.id === obj.id).properties.placeholder}
              onChange={(e) => setText(e, obj)}
              className="txtBox"
            />
          </div>
          <div className="fields">
            <label htmlFor="placeholder">Disabled</label>
            <input
              type="checkbox"
              id="placeholder"
              value={components.find((e) => e.id === obj.id).properties.disabled}
              onChange={(e) => setDisabled(e, obj)}
              className="checkbox"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              width: "75px",
              height: "40px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "#fff",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "5px",
              padding: "0 7px",
            }}
            onClick={() => {
              setComponents(components.filter((e) => e.id !== obj.id));
              handleFocus();
            }}
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </>
    );
  };
  const handleProperties = (obj) => {
    if (obj.type === "image") return showImageControls(obj);
    else if (obj.type === "text") return showTextControls(obj);
    else if (obj.type === "inputField") return showInputControls(obj);
  };

  return (
    <>
      <div className="controlPanel">
        <span className="t2">Controls</span>
        <div>
          {focus.id !== undefined && !isPreview
            ? handleProperties(focus)
            : null}
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
