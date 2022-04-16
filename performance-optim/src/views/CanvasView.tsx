import React, { useEffect } from "react";
import { getViewClassName, Views } from "./view";

import "../common.scss";
import "../components/styles/EditorButtonSet.scss";
import { OreoArtist, OreoFlavor, OreoType } from "../oreo";
import { RoundedButton } from "../components/RoundedButton";

type CanvasViewPropTypes = {
  currentView: Views;
  canvasReady: boolean;
  oreo: OreoType[];
  oreoText: () => string;
  flavor: OreoFlavor
  artist: OreoArtist;
  returnToEditor: () => void;
};

export function CanvasView(props: CanvasViewPropTypes) {
  const { currentView, canvasReady, oreo, oreoText, flavor, artist, returnToEditor } = props;
  const viewClassName = getViewClassName(currentView);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  function downloadImage() {
    const canvas = canvasRef.current!;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "oreo.png";
    link.href = image;
    link.click();
  }

  useEffect(() => {
    artist.draw(oreo, flavor, canvasRef.current!);
  }, [oreo]);

  let flavorDiv: JSX.Element | null = null;
  if (flavor !== OreoFlavor.Vanilla) {
    flavorDiv = <div className={`flavor-description desc-${flavor}`}>But in {flavor} flavor</div>
  }

  return (
    <div className={viewClassName}>
      <div className={`loading-container ${canvasReady ? "hidden" : ""}`}>
        <div className="lds-dual-ring"></div>
        <div className="font-fallback">Loading...</div>
      </div>
      <div className={`result-container ${canvasReady ? "" : "hidden"}`}>
        <div className="result-inner">
          <h2 className="result-title">Oreo Compiled Successfully</h2>
          <div className="editor-set-button-row">
            <RoundedButton
              buttonText="Download"
              onClick={downloadImage}
              extraClassName="result-button-half"
            ></RoundedButton>
            <RoundedButton
              buttonText="Back"
              onClick={returnToEditor}
              extraClassName="result-button-half"
            ></RoundedButton>
          </div>
          <div className="result-description">{oreoText()}</div>
          {flavorDiv}
          <div className="canvas-container">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
