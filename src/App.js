import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Layout from "./components/Layout";
import GlobalUserContext from "./GlobalUserContext";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const [components, setComponents] = useState([]);
  const [focus, setFocus] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [canvasColor, setCanvasColor] = useState("#ffffff");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
      console.log("Component is unmounting, timeout cleared");
    };
  }, []);
  const handleFocus = (id, type, properties) => {
    setFocus({ id, type, properties });
  };
  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };
  return (
    <>
      <GlobalUserContext.Provider
        value={{
          components,
          setComponents,
          focus,
          handleFocus,
          isPreview,
          togglePreview,
          canvasColor,
          setCanvasColor,
        }}
      >
        <DndProvider backend={HTML5Backend}>
          {loaded ? <Layout /> : <Loader />}
        </DndProvider>
      </GlobalUserContext.Provider>
    </>
  );
}

export default App;
