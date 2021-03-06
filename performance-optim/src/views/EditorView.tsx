import { OreoAction, OreoActionType, OreoFlavor, OreoType } from "../oreo";

import { getViewClassName, Views } from "./view";
import { EditorTitle } from "../components/EditorTitle";
import { EditorButtonSet } from "../components/EditorButtonSet";

import "../common.scss";
import React from "react";

type CanvasViewPropTypes = {
  currentView: Views;
  onTitleButtonClick: () => void;
  onCompile: () => void;
  oreo: OreoType[];
  oreoText: () => string;
  oreoUpdateDispatcher: React.Dispatch<OreoAction>;
  flavor: OreoFlavor;
  setFlavor: React.Dispatch<React.SetStateAction<OreoFlavor>>;
};

export function EditorView(props: CanvasViewPropTypes) {
  const {
    currentView,
    onCompile,
    onTitleButtonClick,
    oreo,
    oreoText,
    oreoUpdateDispatcher,
    flavor,
    setFlavor,
  } = props;

  const viewClassName = getViewClassName(currentView);
  const textDisplayClassName = oreo.length ? "color-black" : "color-gray";

  return (
    <div className={viewClassName}>
      <EditorTitle onClick={onTitleButtonClick}></EditorTitle>
      <div className="editor-text-container">
        <div className={`editor-textdisplay ${textDisplayClassName}`}>
          {oreoText()}
        </div>
      </div>
      <EditorButtonSet
        onAddO={() => {
          oreoUpdateDispatcher({ type: OreoActionType.AppendO });
        }}
        onAddRe={() => {
          oreoUpdateDispatcher({ type: OreoActionType.AppendRe });
        }}
        onDelLast={() => {
          oreoUpdateDispatcher({ type: OreoActionType.RemoveLast });
        }}
        onAddEmpty={() => {
          oreoUpdateDispatcher({ type: OreoActionType.AppendEmpty });
        }}
        onClearAll={() =>
          oreoUpdateDispatcher({ type: OreoActionType.ClearAll })
        }
        onCompile={onCompile}
        flavor={flavor}
        onSetFlavor={setFlavor}
      ></EditorButtonSet>
    </div>
  );
}
