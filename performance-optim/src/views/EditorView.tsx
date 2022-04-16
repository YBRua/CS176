import { Views } from "./view";
import { OreoButton } from "../components/OreoButton";
import { EditorTitle } from "../components/EditorTitle";

import "../common.scss";

type CanvasViewPropTypes = {
  currentView: Views;
  onTitleButtonClick: () => void;
};

export function EditorView(props: CanvasViewPropTypes) {
  const currentView = props.currentView;
  const viewClassName =
    currentView === Views.Editor
      ? "full-height-container translate-up"
      : "full-height-container";
  return (
    <div className={viewClassName}>
      <EditorTitle onClick={props.onTitleButtonClick}></EditorTitle>
      <OreoButton
        imgSrc="./src/figs/minified/O.png"
        imgAlt="Add O"
        imgHeight={41}
        imgWidth={60}
        buttonText="+O"
        onClick={() => {}}
      ></OreoButton>
    </div>
  );
}
