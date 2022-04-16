import "./styles/RoundedButton.scss";

type RoundedButtonPropTypes = {
  buttonText: string;
  onClick: () => void;
  extraClassName?: string;
};

export function RoundedButton(props: RoundedButtonPropTypes) {
  const { buttonText, onClick, extraClassName } = props;
  const className = `rounded-button ${extraClassName || ""}`;
  return (
    <button className={className} onClick={onClick} type="button">
      {buttonText}
    </button>
  );
}
