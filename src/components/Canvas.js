import React, { useState, useContext } from "react";
import { useDrop } from "react-dnd";
import TextBox from "./TextBox";
import ImageBox from "./ImageBox";
import ButtonBox from "./ButtonBox";
import InpotBox from "./InpotBox";
import GlobalUserContext from "../GlobalUserContext";

const Canvas = () => {
  const { components, setComponents, togglePreview, isPreview, canvasColor } =
    useContext(GlobalUserContext);

  const [{ isOver }, drop] = useDrop({
    accept: ["text", "image", "button", "inputField"],
    drop: (item, monitor) => {
      const newComponent = {
        type: item.type,
        id: components.length, // Generate a unique ID based on the length of the array
        properties: item.properties || {}, // Add properties from the dragged item
      };
      setComponents([...components, newComponent]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const applyProperties = (id, props) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, properties: props } : component
      )
    );
  };

  return (
    <div className="canvas-container">
      <div
        ref={!isPreview ? drop : null}
        className="canvas"
        style={{ backgroundColor: isOver ? "#e0e0e0" : canvasColor }}
      >
        {components?.length > 0 ? (
          components.map((component) => {
            switch (component.type) {
              case "text":
                return (
                  <TextBox
                    isPreview={isPreview}
                    id={component.id}
                    key={component.id}
                  />
                );
              case "image":
                return (
                  <ImageBox
                    key={component.id}
                    id={component.id}
                    isPreview={isPreview}
                  />
                );
              case "button":
                return (
                  <ButtonBox
                    key={component.id}
                    id={component.id}
                    isPreview={isPreview}
                  />
                );
              case "inputField":
                return (
                  <InpotBox
                    key={component.id}
                    id={component.id}
                    isPreview={isPreview}
                  />
                );
              default:
                return null;
            }
          })
        ) : (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              color: "grey",
            }}
          >
            Drop your components here
          </span>
        )}
      </div>
    </div>
  );
};

export default Canvas;
