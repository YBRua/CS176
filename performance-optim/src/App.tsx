import React, { useEffect, useState } from "react";
import { useOreo } from "./hooks/useOreo";
import { OreoActionType, OreoArtist, OreoFlavor } from "./oreo";

import { TitleView } from "./views/TitleView";
import { EditorView } from "./views/EditorView";
import { CanvasView } from "./views/CanvasView";
import { getAppClassName, Views } from "./views/view";

let artist: OreoArtist | null = null;

function App() {
  const [currentView, setCurrentView] = useState(Views.Home);
  const [oreo, oreoText, dispatchOreoUpdate] = useOreo();
  const [flavor, setFlavor] = useState(OreoFlavor.Vanilla);

  const [loading, setLoading] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [artist, setArtist] = useState(
    new OreoArtist(setLoading, setCanvasReady)
  );

  useEffect(() => {
    artist._loadImages();
  }, [artist]);

  function gotoEditor() {
    setCurrentView(Views.Editor);
  }

  function gotoHome() {
    setCurrentView(Views.Home);
  }

  function gotoCanvas() {
    setCurrentView(Views.Canvas);
  }

  function returnToEditor() {
    setCurrentView(Views.Editor);
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
          gotoCanvas();
      }
    }
  }

  let PreCompileViews: JSX.Element | null = null;
  if (currentView === Views.Home || currentView === Views.Editor) {
    PreCompileViews = (
      <div>
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
          onCompile={gotoCanvas}
          flavor={flavor}
          setFlavor={setFlavor}
        ></EditorView>
      </div>
    );
  }

  let PostCompileViews: JSX.Element | null = null;
  if (currentView === Views.Canvas) {
    PostCompileViews = (
      <CanvasView
        currentView={currentView}
        oreo={oreo}
        oreoText={oreoText}
        canvasReady={canvasReady}
        artist={artist}
        returnToEditor={returnToEditor}
        flavor={flavor}
      ></CanvasView>
    );
  }

  return (
    <div
      className={getAppClassName(currentView)}
      onKeyDown={keyDownHandler}
      tabIndex={0}
    >
      {PreCompileViews}
      {PostCompileViews}
    </div>
  );
}

export default App;
