import "../common.scss";
import { Views } from "./view";

type CanvasViewPropTypes = {
  currentView: Views;
};

export function EditorView(props: CanvasViewPropTypes) {
  const currentView = props.currentView;
  const viewClassName = currentView === Views.Editor
    ? "full-height-container translate-up placeholder"
    : "full-height-container";
  return <div className={viewClassName}>Placeholder</div>;
}
