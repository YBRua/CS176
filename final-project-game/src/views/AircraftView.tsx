import { AircraftItem } from "../components/AircraftItem";
import { loadAircrafts } from "../data/aircraft/aircraft";

import "../styles/main.css";

type AircraftViewPropTypes = {
  setAircraftId: (id: number) => void;
};

export function AircraftView(props: AircraftViewPropTypes) {
  const aircrafts = loadAircrafts();
  return (
    <div className="w-11/12 py-2">
      <ul className="flex flex-col gap-2">
        {aircrafts.map((aircraft) => (
          <li key={aircraft.id}>
            <AircraftItem
              aircraft={aircraft}
              onSelectClick={() => props.setAircraftId(aircraft.id)}
            ></AircraftItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
