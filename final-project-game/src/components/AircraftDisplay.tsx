import { Aircraft, resolveAircraftImagePath } from "../data/aircraft/aircraft";
import { Weapon } from "../data/weapon/weapon";

import "../styles/AircraftDisplay.css";

type AircraftDisplayPropTypes = {
  aircraft: Aircraft;
  weapon: Weapon;
  playerHP: number;
  score: number;
};

export function AircraftDisplay(props: AircraftDisplayPropTypes) {
  const { aircraft, weapon, playerHP, score } = props;
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

      <div className="name-display-container">
        <div className="name-display">
          <div className="name-display-key">Aircraft</div>
          <div className="name-display-value">{aircraft.name}</div>
        </div>
        <div className="name-display">
          <div className="name-display-key">Weapon</div>
          <div className="name-display-value">{weapon.name}</div>
        </div>
        <div className="name-display">
          <div className="name-display-key">HP</div>
          <div className="name-display-value">
            {playerHP}/{aircraft.hp}
          </div>
        </div>
        <div className="name-display">
          <div className="name-display-key">Score</div>
          <div className="name-display-value">{score}</div>
        </div>
      </div>
    </div>
  );
}
