import { useState } from "react";
import { TitleView } from "./views/TitleView";
import { CanvasView } from "./views/CanvasView";

function App() {
  const [isTitlePage, toggleIsTitlePage] = useState(true);

  function onToggleIsTitlePage() {
    toggleIsTitlePage(!isTitlePage);
  }

  return (
    <div className="App">
      <TitleView
        isTitlePage={isTitlePage}
        onLargeButtonClick={() => onToggleIsTitlePage()}
      ></TitleView>
      <CanvasView isTitlePage={isTitlePage}></CanvasView>
    </div>
  );
}

export default App;
