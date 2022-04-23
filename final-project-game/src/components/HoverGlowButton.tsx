import { useState } from "react";

import "../styles/HoverGlowButton.css";

type HoverGlowButtonPropTypes = {
  onClick?: () => void;
};

export function HoverGlowButton() {
  return <button className="hover-glow-button">Test</button>;
}
