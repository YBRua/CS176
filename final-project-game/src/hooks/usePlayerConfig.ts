import { useState } from "react";

export interface PlayerConfig {
  aircraftId: number;
  weaponId: number;
}

export function usePlayerConfig(): [
  PlayerConfig,
  (id: number) => void,
  (id: number) => void,
] {
  const [player, setPlayer] = useState<PlayerConfig>({
    aircraftId: 1,
    weaponId: 1,
  });

  function setAircraftId(id: number) {
    setPlayer({
      ...player,
      aircraftId: id,
    });
  }

  function setWeaponId(id: number) {
    setPlayer({
      ...player,
      weaponId: id,
    });
  }

  return [player, setAircraftId, setWeaponId];
}
