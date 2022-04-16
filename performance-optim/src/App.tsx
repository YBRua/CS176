import { useState } from "react";
import { useOreo } from "./hooks/useOreo";

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

  return (
    <div className="App">
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
      ></EditorView>
    </div>
  );
}

export default App;
