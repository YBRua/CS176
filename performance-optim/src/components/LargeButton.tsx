import "./styles/LargeButton.scss";

type LargeButtonPropTypes = {
  onClick: () => void;
  text: string;
};

export function LargeButton(props: LargeButtonPropTypes) {
  return (
    <button type="button" className="large-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
