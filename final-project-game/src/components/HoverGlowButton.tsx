import "../styles/HoverGlowButton.css";

type HoverGlowButtonPropTypes = {
  btnText: string;
  onClick?: () => void;
  extraClassNames?: string;
};

export function HoverGlowButton(props: HoverGlowButtonPropTypes) {
  return (
    <button
      className={`hover-glow-button ${props.extraClassNames}`}
      onClick={props.onClick}
    >
      {props.btnText}
    </button>
  );
}
