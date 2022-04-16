import React from "react";
import { OreoFlavor } from "../oreo";
import { OreoButton } from "./OreoButton";
import { RoundedButton } from "./RoundedButton";

import "./styles/EditorButtonSet.scss";
import "./styles/RoundedButton.scss";

type EditorButtonSetPropTypes = {
  onAddO: () => void;
  onAddRe: () => void;
  onAddEmpty: () => void;
  onDelLast: () => void;
  onClearAll: () => void;
  onCompile: () => void;
  flavor: OreoFlavor;
  onSetFlavor: React.Dispatch<React.SetStateAction<OreoFlavor>>;
};

export function EditorButtonSet(props: EditorButtonSetPropTypes) {
  return (
    <div className="buttonset-container">
      <div className="editor-set-button-row">
        <OreoButton
          imgSrc="./src/figs/minified/O.png"
          imgAlt="Add O"
          imgHeight={41}
          imgWidth={60}
          buttonText="+O"
          onClick={props.onAddO}
        ></OreoButton>
        <OreoButton
          imgSrc="./src/figs/minified/R.png"
          imgAlt="Add Re"
          imgHeight={41}
          imgWidth={60}
          buttonText="+Re"
          onClick={props.onAddRe}
        ></OreoButton>
      </div>
      <div className="editor-set-button-row">
        <RoundedButton
          onClick={() => props.onSetFlavor(OreoFlavor.Vanilla)}
          buttonText="Vanilla"
          extraClassName={`editor-set-button-quarter vanilla ${
            props.flavor === OreoFlavor.Vanilla ? "selected" : ""
          }`}
        ></RoundedButton>
        <RoundedButton
          onClick={() => props.onSetFlavor(OreoFlavor.Strawberry)}
          buttonText="Strawberry"
          extraClassName={`editor-set-button-quarter strawberry ${
            props.flavor === OreoFlavor.Strawberry ? "selected" : ""
          }`}
        ></RoundedButton>
        <RoundedButton
          onClick={() => props.onSetFlavor(OreoFlavor.Chocolate)}
          buttonText="Chocolate"
          extraClassName={`editor-set-button-quarter chocolate ${
            props.flavor === OreoFlavor.Chocolate ? "selected" : ""
          }`}
        ></RoundedButton>
        <RoundedButton
          onClick={() => props.onSetFlavor(OreoFlavor.Matcha)}
          buttonText="Matcha"
          extraClassName={`editor-set-button-quarter matcha ${
            props.flavor === OreoFlavor.Matcha ? "selected" : ""
          }`}
        ></RoundedButton>
      </div>
      <RoundedButton
        onClick={props.onAddEmpty}
        buttonText="</> +Space"
        extraClassName="editor-set-button"
      ></RoundedButton>
      <div className="editor-set-button-row">
        <RoundedButton
          onClick={props.onDelLast}
          buttonText="Backspace"
          extraClassName="editor-set-button-half"
        ></RoundedButton>
        <RoundedButton
          onClick={props.onClearAll}
          buttonText="ClearAll"
          extraClassName="editor-set-button-half"
        ></RoundedButton>
      </div>
      <RoundedButton
        onClick={props.onCompile}
        buttonText="Compile!"
        extraClassName="editor-set-button inverted"
      ></RoundedButton>
    </div>
  );
}
