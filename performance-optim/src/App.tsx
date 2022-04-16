import React, { useEffect, useRef, useState } from "react";
import { useOreo } from "./hooks/useOreo";
import { OreoActionType, OreoArtist } from "./oreo";

import { TitleView } from "./views/TitleView";
import { EditorView } from "./views/EditorView";
import { CanvasView } from "./views/CanvasView";
import { Views } from "./views/view";

let artist: OreoArtist | null = null;

function App() {
  const [currentView, setCurrentView] = useState(Views.Home);
  const [oreo, oreoText, dispatchOreoUpdate] = useOreo();
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasEl = <canvas ref={canvasRef}></canvas>;

  useEffect(() => {
    if (!artist) {
      console.log("Creating artist");
      artist = new OreoArtist(canvasRef.current!, setLoading);
      artist._loadImages();
    }
  }, [canvasRef]);

  function gotoEditor() {
    setCurrentView(Views.Editor);
  }

  function gotoHome() {
    setCurrentView(Views.Home);
  }

  function renderCanvas() {
    setCurrentView(Views.Canvas);
    artist!.draw(oreo);
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (currentView === Views.Editor) {
      switch (e.key) {
        case "o":
          dispatchOreoUpdate({ type: OreoActionType.AppendO });
          break;
        case "r":
          dispatchOreoUpdate({ type: OreoActionType.AppendRe });
          break;
        case "Backspace":
          dispatchOreoUpdate({ type: OreoActionType.RemoveLast });
          break;
        case " ":
          dispatchOreoUpdate({ type: OreoActionType.AppendEmpty });
          break;
        case "Enter":
          renderCanvas();
      }
    }
  }

  function onCompile() {
    console.log("Compile");
    renderCanvas();
  }

  return (
    <div className="App" onKeyDown={keyDownHandler} tabIndex={0}>
      <TitleView
        currentView={currentView}
        onLargeButtonClick={() => gotoEditor()}
        loading={loading}
      ></TitleView>
      <EditorView
        currentView={currentView}
        onTitleButtonClick={gotoHome}
        oreo={oreo}
        oreoText={oreoText}
        oreoUpdateDispatcher={dispatchOreoUpdate}
        onCompile={onCompile}
      ></EditorView>
      <CanvasView
        currentView={currentView}
        canvasElement={canvasEl}
        oreoText={oreoText}
        loading={loading}
      ></CanvasView>
    </div>
  );
}

export default App;
