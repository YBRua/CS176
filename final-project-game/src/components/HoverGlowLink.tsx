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
      className={({ isActive }) =>
        isActive
          ? `hover-glow-button link-active ${props.extraClassName}`
          : `hover-glow-button ${props.extraClassName}`
      }
    >
      {props.btnText}
    </NavLink>
  );
}
