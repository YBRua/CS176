import { AircraftItem } from "../components/AircraftItem";
import { loadAircrafts } from "../data/aircraft/aircraft";

import "../styles/main.css";

export function AircraftView() {
  const aircrafts = loadAircrafts();
  return (
    <div className="w-11/12 py-2">
      <ul className="flex flex-col gap-2">
        {aircrafts.map((aircraft) => (
          <li key={aircraft.id}>
            <AircraftItem aircraft={aircraft}></AircraftItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
