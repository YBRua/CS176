import React, { useEffect, useRef, useState } from "react";
import { useOreo } from "./hooks/useOreo";
import { OreoActionType, OreoArtist } from "./oreo";

import { TitleView } from "./views/TitleView";
import { EditorView } from "./views/EditorView";
import { CanvasView } from "./views/CanvasView";
import { getAppClassName, Views } from "./views/view";

let artist: OreoArtist | null = null;

function App() {
  const [currentView, setCurrentView] = useState(Views.Home);
  const [oreo, oreoText, dispatchOreoUpdate] = useOreo();
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState(new OreoArtist(setLoading));

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

  function onCompile() {
    // console.log("Compile");
    gotoCanvas();
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
          onCompile={onCompile}
        ></EditorView>
      </div>
    );
  }

  let PostCompileViews = (
    <CanvasView
      currentView={currentView}
      oreo={oreo}
      oreoText={oreoText}
      loading={loading}
      artist={artist}
    ></CanvasView>
  );

  return (
    <div
      className={getAppClassName(currentView)}
      onKeyDown={keyDownHandler}
      tabIndex={0}
    >
      {PreCompileViews}
      {currentView === Views.Canvas ? PostCompileViews : null}
    </div>
  );
}

export default App;
