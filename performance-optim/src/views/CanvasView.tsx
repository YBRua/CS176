import { getViewClassName, Views } from "./view";
import "../common.scss";

type CanvasViewPropTypes = {
  currentView: Views;
  canvasElement: React.ReactNode;
  loading: boolean;
  oreoText: () => string;
};

export function CanvasView(props: CanvasViewPropTypes) {
  const { currentView, canvasElement, loading, oreoText } = props;
  const viewClassName = getViewClassName(currentView);

  // if (loading) {
  //   return (
  //     <div className={viewClassName + " flex-center flex-col"}>
  //       <div className="lds-dual-ring"></div>
  //       <div className="font-fallback">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className={viewClassName}>
      <div className="result-container">
        <div className="result-inner">
          <h2 className="result-title">Here's Your</h2>
          <div className="result-description">{oreoText()}</div>
          <div className="canvas-container">{canvasElement}</div>
        </div>
      </div>
    </div>
  );
}
