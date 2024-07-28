import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import GlobalUserContext from "../GlobalUserContext";

const DraggableItem = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

const Toolbar = () => {
  const { setCanvasColor, canvasColor } = useContext(GlobalUserContext);
  console.log(canvasColor, "hi");
  return (
    <div className="toolbar">
      <p className="t2">Components</p>
      <DraggableItem type="text">
        <button className="draggableBtn">Text</button>
      </DraggableItem>
      <DraggableItem type="image">
        <button className="draggableBtn">Image</button>
      </DraggableItem>
      <DraggableItem type="button">
        <button className="draggableBtn">Button</button>
      </DraggableItem>
      <DraggableItem type="inputField">
        <button className="draggableBtn">Input Field</button>
      </DraggableItem>
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize:"15px",
          width: "246px",
        }}
        className="draggableBtn"
      >
        <label htmlFor="changebg">Canvas Color</label>
        <input
          type="color"
          onChange={(e) => setCanvasColor(e.target.value)}
          value={canvasColor}
        />
      </div>
    </div>
  );
};

export default Toolbar;
