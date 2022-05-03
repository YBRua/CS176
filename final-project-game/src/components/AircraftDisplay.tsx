import { Aircraft, resolveAircraftImagePath } from "../data/aircraft/aircraft";

import "../styles/AircraftDisplay.css";

type AircraftDisplayPropTypes = {
  aircraft: Aircraft;
};

export function AircraftDisplay(props: AircraftDisplayPropTypes) {
  const { aircraft } = props;
  const imgSrc = resolveAircraftImagePath(aircraft, true);
  return (
    <div>
      <div className="display-container">
        <img
          src={imgSrc}
          alt={aircraft.name}
          width={120}
          height={120}
          className="aircraft-display"
        />
      </div>

      <h4 className="display-name">{aircraft.name}</h4>
    </div>
  );
}
