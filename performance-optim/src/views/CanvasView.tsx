import React, { useEffect } from "react";
import { getViewClassName, Views } from "./view";

import "../common.scss";
import { OreoArtist, OreoType } from "../oreo";

type CanvasViewPropTypes = {
  currentView: Views;
  loading: boolean;
  oreo: OreoType[];
  oreoText: () => string;
  artist: OreoArtist;
};

export function CanvasView(props: CanvasViewPropTypes) {
  const { currentView, loading, oreo, oreoText, artist } = props;
  const viewClassName = getViewClassName(currentView);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // if (loading) {
  //   return (
  //     <div className={viewClassName + " flex-center flex-col"}>
  //       <div className="lds-dual-ring"></div>
  //       <div className="font-fallback">Loading...</div>
  //     </div>
  //   );
  // }
  useEffect(() => {
    artist.draw(oreo, canvasRef.current!);
  }, [oreo]);

  return (
    <div className={viewClassName}>
      <div className="result-container">
        <div className="result-inner">
          <h2 className="result-title">Here's Your</h2>
          <div className="result-description">{oreoText()}</div>
          <div className="canvas-container">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
