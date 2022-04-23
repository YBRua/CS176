import { Outlet } from "react-router-dom";
import { HoverGlowLink } from "../components/HoverGlowLink";

import "../styles/main.css";

export function HangarView() {
  return (
    <div className="flex items-center flex-col">
      <h3 className="py-8 w-11/12 text-center">Hangar</h3>
      <div className="flex flex-row w-11/12 items-center justify-center py-2 border-y-2 border-zinc-100">
        <HoverGlowLink
          to="aircraft"
          btnText="Aircraft"
          extraClassName="text-xl"
        ></HoverGlowLink>
        <HoverGlowLink
          to="weaponry"
          btnText="Weaponry"
          extraClassName="text-xl"
        ></HoverGlowLink>
        <HoverGlowLink
          to="/"
          btnText="Back"
          extraClassName="text-xl"
        ></HoverGlowLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
