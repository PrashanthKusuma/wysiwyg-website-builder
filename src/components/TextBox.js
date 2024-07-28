import React, { useContext, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import GlobalUserContext from "../GlobalUserContext";

const TextBox = ({ isPreview, id }) => {
  const { handleFocus, setComponents, components } =
    useContext(GlobalUserContext);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [display, setDisplay] = useState("none");
  const [editMode, setEditMode] = useState(true);

  const config = {
    readonly: false,
    height: 400,
    toolbarButtonSize: "large",
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "eraser",
      "ul",
      "ol",
      "outdent",
      "indent",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "image",
      "table",
      "link",
      "align",
      "undo",
      "redo",
      "hr",
      "copyformat",
      "fullsize",
      "selectall",
      "cut",
      "copy",
      "paste",
      "source",
    ],
  };

  const showControls = () => {
    return;
  };

  return (
    <div className="text-box">
      {editMode && !isPreview ? (
        <>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
          <button
            style={{
              height: "30px",
              width: "100px",
              marginTop: "5px",
              backgroundColor: "green",
              color: "#fff",
              borderRadius: "5px",
              outline: "none",
              border: "none",
            }}
            onClick={() => setEditMode(false)}
          >
            Done
          </button>
        </>
      ) : (
        <div
          onMouseOver={() => setDisplay("flex")}
          onMouseOut={() => setDisplay("none")}
          onBlur={() => setDisplay("none")}
        >
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="newContainer"
          />
          {!isPreview ? (
            <div style={{ display: display }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#000",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
                onClick={() => setEditMode(true)}
              >
                <i className="fas fa-pen"></i>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#000",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setComponents(components.filter((e) => e.id !== id));
                  handleFocus();
                }}
              >
                <i className="fas fa-trash"></i>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TextBox;
