import React, { useState, useContext, useRef } from "react";
import GlobalUserContext from "../GlobalUserContext";

const ImageBox = ({ id }) => {
  const [image, setImage] = useState("");
  const { focus, handleFocus, isPreview, setComponents, components } =
    useContext(GlobalUserContext);
  const imageRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (image) {
      handleFocus(id, "image", { src: "image" });
      components.find((e) => e.id == id).properties.src = image;
      setComponents([...components]);
    }
  };

  const handleDelete = () => {
    setComponents(components.filter((e) => e.id !== id));
  };

  return (
    <div ref={imageRef}>
      {image
        ? components &&
          components.map((component) =>
            component.type === "image" && component.id === id ? (
              <img
                key={component.id} // Ensure each element has a unique key
                src={image}
                alt="Selected"
                onClick={handleClick}
                className={isPreview?"":"hover"}
                style={{ width: `${component.properties.width}%` }}
              />
            ) : null
          )
        : !isPreview && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="file-input">
                <input
                  type="file"
                  id="file"
                  className="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="file">Select Image</label>
              </div>
              <button
                style={{
                  width: "12%",
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
                onClick={handleDelete}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          )}
    </div>
  );
};

export default ImageBox;
