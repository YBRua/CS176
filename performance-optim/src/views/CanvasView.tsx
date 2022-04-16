import { OreoType } from "../oreo";
import { getViewClassName, Views } from "./view";

type CanvasViewPropTypes = {
  currentView: Views;
  oreo: OreoType[];
};

export function CanvasView(props: CanvasViewPropTypes) {
  const { currentView, oreo } = props;
  const viewClassName = getViewClassName(currentView);
  return <div className={viewClassName}>Placeholder</div>;
}
