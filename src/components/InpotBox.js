import React, { useContext, useState, useEffect } from "react";
import GlobalUserContext from "../GlobalUserContext";

function InpotBox({ id }) {
  const [placeHolder, setPlaceholder] = useState("Enter your text here");
  const [disabled, setDisabled] = useState(false);
  const { handleFocus, setComponents, components, isPreview } =
    useContext(GlobalUserContext);
  useEffect(() => {
    let newObj = components.find((e) => e.id == id);
    newObj.properties.placeholder &&
      setPlaceholder(newObj.properties.placeholder);
    newObj.properties.disabled != undefined &&
      setDisabled(newObj.properties.disabled);
  }, [components]);

  const handleClick = () => {
    handleFocus(id, "inputField", { placeholder: placeHolder });
    let newObj = components && components?.find((e) => e.id == id);
    newObj.properties.placeholder = placeHolder;
    newObj.properties.disabled = disabled;
    setComponents([...components]);
  };
  return (
    <div
      onClick={handleClick}
      style={{ zIndex: disabled ? "999" : "-1", cursor: "pointer" }}
    >
      <input
        type="text"
        style={{
          height: "35px",
          width: "250px",
          padding: "10px",
          borderRadius: "5px",
          position: "relative",
          border: "1px solid grey",
          outline: "none",
        }}
        className={isPreview ? "" : "hover"}
        disabled={disabled}
        placeholder={placeHolder}
        onClick={handleClick}
      />
    </div>
  );
}

export default InpotBox;
