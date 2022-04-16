import { OreoButton } from "./OreoButton";
import { RoundedButton } from "./RoundedButton";

import "./styles/EditorButtonSet.scss";

type EditorButtonSetPropTypes = {
  onAddO: () => void;
  onAddRe: () => void;
  onAddEmpty: () => void;
  onDelLast: () => void;
};

export function EditorButtonSet(props: EditorButtonSetPropTypes) {
  return (
    <div className="buttonset-container">
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
        onClick={props.onAddO}
      ></OreoButton>
      <RoundedButton
        onClick={props.onAddEmpty}
        buttonText="</> +Space"
        extraClassName="editor-set-button"
      ></RoundedButton>
      <RoundedButton
        onClick={props.onDelLast}
        buttonText="Backspace"
        extraClassName="editor-set-button"
      ></RoundedButton>
    </div>
  );
}
