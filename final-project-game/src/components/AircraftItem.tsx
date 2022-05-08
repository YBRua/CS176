import { HoverGlowButton } from "./HoverGlowButton";
import { Aircraft, resolveAircraftImagePath } from "../data/aircraft/aircraft";

import "../styles/AircraftItem.css";
import "../styles/main.css";

type AircraftItemPropTypes = {
  aircraft: Aircraft;
  onSelectClick: () => void;
  onDetailClick: () => void;
};

export function AircraftItem(props: AircraftItemPropTypes) {
  const { aircraft, onSelectClick, onDetailClick } = props;
  const imgSrc = resolveAircraftImagePath(aircraft, true);
  return (
    <div
      className="
      aircraft-item rounded-item-outer"
    >
      <img
        src={imgSrc}
        alt={aircraft.name}
        width={60}
        height={60}
        className="aircraft-image mx-4"
      />
      <div className="rounded-item-inner">
        <div className="w-1/4">
          <div className="text-zinc-400">Name</div>
          <div className="text-zinc-200">{aircraft.name}</div>
        </div>
        <div className="w-1/4">
          <div className="text-zinc-400">Speed</div>
          <div className="text-zinc-200">{aircraft.speed}</div>
        </div>
        <div className="w-1/4">
          <div className="text-zinc-400">HP</div>
          <div className="text-zinc-200">{aircraft.hp}</div>
        </div>
        <HoverGlowButton
          btnText="SELECT"
          onClick={() => {
            onSelectClick();
          }}
        ></HoverGlowButton>
        <HoverGlowButton
          btnText="DETAIL"
          onClick={() => {
            onDetailClick();
          }}
        ></HoverGlowButton>
      </div>
    </div>
  );
}
