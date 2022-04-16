import { RoundedButton } from "./RoundedButton";

import './styles/EditorTitle.scss';

type EditorTitlePropTypes = {
  onClick: () => void;
};

export function EditorTitle(props: EditorTitlePropTypes) {
  const roundedButtonStyles = "editor-title-button";
  return (
    <div className="editor-title-container">
      <h2 className="editor-title">Oreo Editor</h2>
      <RoundedButton
        onClick={props.onClick}
        buttonText="<- Back"
        extraClassName={roundedButtonStyles}
      ></RoundedButton>
    </div>
  );
}
