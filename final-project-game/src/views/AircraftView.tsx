import { useState } from "react";
import { AircraftDetailModal } from "../components/AircraftDetailModal";
import { AircraftItem } from "../components/AircraftItem";
import { loadAircrafts } from "../data/aircraft/aircraft";

import "../styles/main.css";

type AircraftViewPropTypes = {
  setAircraftId: (id: number) => void;
};

export function AircraftView(props: AircraftViewPropTypes) {
  const { setAircraftId } = props;
  const aircrafts = loadAircrafts();
  const [openedModalId, setOpenedModalId] = useState(-1);
  return (
    <div className="w-11/12 py-2">
      <ul className="flex flex-col gap-2">
        {aircrafts.map((aircraft) => (
          <li key={aircraft.id}>
            <AircraftItem
              aircraft={aircraft}
              onSelectClick={() => setAircraftId(aircraft.id)}
              onDetailClick={() => setOpenedModalId(aircraft.id)}
            ></AircraftItem>
            <AircraftDetailModal
              aircraft={aircraft}
              isOpen={openedModalId === aircraft.id}
              onClose={() => setOpenedModalId(-1)}
            ></AircraftDetailModal>
          </li>
        ))}
      </ul>
    </div>
  );
}
