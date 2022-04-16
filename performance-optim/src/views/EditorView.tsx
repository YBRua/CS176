import { OreoAction, OreoActionType, OreoType } from "../oreo";

import { Views } from "./view";
import { EditorTitle } from "../components/EditorTitle";
import { EditorButtonSet } from "../components/EditorButtonSet";

import "../common.scss";
import React from "react";

type CanvasViewPropTypes = {
  currentView: Views;
  onTitleButtonClick: () => void;
  oreo: OreoType[];
  oreoText: () => string;
  oreoUpdateDispatcher: React.Dispatch<OreoAction>;
};

export function EditorView(props: CanvasViewPropTypes) {
  const {
    currentView,
    onTitleButtonClick,
    oreo,
    oreoText,
    oreoUpdateDispatcher,
  } = props;

  const viewClassName =
    currentView === Views.Editor
      ? "full-height-container translate-up"
      : "full-height-container";
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
      ></EditorButtonSet>
    </div>
  );
}
