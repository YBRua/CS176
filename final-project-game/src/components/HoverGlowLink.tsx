import { NavLink } from "react-router-dom";
import "../styles/HoverGlowButton.css";

type HoverGlowLinkPropTypes = {
  to: string;
  btnText: string;
  extraClassName?: string;
};

export function HoverGlowLink(props: HoverGlowLinkPropTypes) {
  return (
    <NavLink
      to={props.to}
      className={`hover-glow-button ${props.extraClassName}`}
    >
      {props.btnText}
    </NavLink>
  );
}
