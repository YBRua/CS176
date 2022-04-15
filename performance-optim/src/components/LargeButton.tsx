import { useEffect, useState } from "react";
import "./styles/LargeButton.scss";

type LargeButtonPropTypes = {
  onClick: () => void;
  text: string;
  hoverText: string;
};

export function LargeButton(props: LargeButtonPropTypes) {
  const [buttonText, setButtonText] = useState(props.text);

  // useEffect(() => {
  //   setButtonText(props.text);
  // })

  function onMouseEnter() {
    setButtonText(props.hoverText);
  }

  function onMouseLeave() {
    setButtonText(props.text);
  }

  return (
    <button
      type="button"
      className="large-button"
      onClick={props.onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {buttonText}
    </button>
  );
}
