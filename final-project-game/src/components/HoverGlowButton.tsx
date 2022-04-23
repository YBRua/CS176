import "../styles/HoverGlowButton.css";

type HoverGlowButtonPropTypes = {
  btnText: string;
  onClick?: () => void;
};

export function HoverGlowButton(props: HoverGlowButtonPropTypes) {
  return (
    <button className="hover-glow-button" onClick={props.onClick}>
      {props.btnText}
    </button>
  );
}
