import { Views } from "./view";
import { EditorTitle } from "../components/EditorTitle";
import { EditorButtonSet } from "../components/EditorButtonSet";

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
      <EditorButtonSet
        onAddO={() => {}}
        onAddRe={() => {}}
        onDelLast={() => {}}
        onAddEmpty={() => {}}
      ></EditorButtonSet>
    </div>
  );
}
