import React, { useState } from "react";
import { useOreo } from "./hooks/useOreo";
import { OreoActionType } from "./oreo";

import { TitleView } from "./views/TitleView";
import { EditorView } from "./views/EditorView";
import { Views } from "./views/view";

function App() {
  const [currentView, setCurrentView] = useState(Views.Home);
  const [oreo, oreoText, dispatchOreoUpdate] = useOreo();

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
    console.log("Compile");
    setCurrentView(Views.Canvas);
  }

  return (
    <div className="App" onKeyDown={keyDownHandler} tabIndex={0}>
      <TitleView
        currentView={currentView}
        onLargeButtonClick={() => gotoEditor()}
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

export default App;
