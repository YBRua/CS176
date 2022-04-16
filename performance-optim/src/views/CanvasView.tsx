import React, { useEffect } from "react";
import { getViewClassName, Views } from "./view";

import "../common.scss";
import { OreoArtist, OreoType } from "../oreo";

type CanvasViewPropTypes = {
  currentView: Views;
  canvasReady: boolean;
  oreo: OreoType[];
  oreoText: () => string;
  artist: OreoArtist;
};

export function CanvasView(props: CanvasViewPropTypes) {
  const { currentView, canvasReady, oreo, oreoText, artist } = props;
  const viewClassName = getViewClassName(currentView);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    artist.draw(oreo, canvasRef.current!);
  }, [oreo]);

  return (
    <div className={viewClassName}>
      <div className={`loading-container ${canvasReady ? "hidden" : ""}`}>
        <div className="lds-dual-ring"></div>
        <div className="font-fallback">Loading...</div>
      </div>
      <div className={`result-container ${canvasReady ? "" : "hidden"}`}>
        <div className="result-inner">
          <h2 className="result-title">Oreo Compiled Successfully</h2>
          <div className="result-description">{oreoText()}</div>
          <div className="canvas-container">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
