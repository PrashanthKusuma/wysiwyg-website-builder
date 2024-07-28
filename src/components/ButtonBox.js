import React, { useState, useContext, useEffect } from "react";
import GlobalUserContext from "../GlobalUserContext";

const ButtonBox = ({ id }) => {
  const [text, setText] = useState("Button");
  const [background, setBackground] = useState("#000000");
  const [txtColor,setTxtColor]=useState("#ffffff")
  const { handleFocus, setComponents, components,isPreview } =
    useContext(GlobalUserContext);

  useEffect(() => {
    setText(components.find((e) => e.id === id).properties.txt ?? text);
    setBackground(
      components.find((e) => e.id === id).properties.backgroundColor ??
        background
    );
    setTxtColor(
      components.find((e) => e.id === id).properties.textColor ??
        txtColor
    );
  });

  const handleClick = () => {
    if (text) {
      handleFocus(id, "text", { txt: text });
      let newObj = components.find((e) => e.id == id);
      newObj.properties.txt = text;
      newObj.properties.backgroundColor = background;
      newObj.properties.textColor = txtColor;
      setComponents([...components]);
    }
  };

  return (
    <div className="button-box">
      <button
        className={isPreview?"BtnBox":"BtnBox hover"}
        onClick={handleClick}
        style={{ backgroundColor: background, color:txtColor }}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonBox;
