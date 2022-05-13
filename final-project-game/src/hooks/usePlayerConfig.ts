import { useState } from "react";

export interface PlayerConfig {
  aircraftId: number;
  weaponId: number;
  levelId: number;
}

function save(config: PlayerConfig): void {
  console.log(config);
  localStorage.setItem("simple-air-combat", JSON.stringify(config));
}

export function usePlayerConfig(): [
  PlayerConfig,
  (id: number) => void,
  (id: number) => void,
  (id: number) => void
] {
  const playerConfig = JSON.parse(
    localStorage.getItem("simple-air-combat") || "{}"
  ) as PlayerConfig;
  if (!playerConfig.aircraftId) {
    playerConfig.aircraftId = 1;
  }
  if (!playerConfig.weaponId) {
    playerConfig.weaponId = 1;
  }
  if (!playerConfig.levelId) {
    playerConfig.levelId = 1;
  }
  const [player, setPlayer] = useState<PlayerConfig>(playerConfig);

  function setAircraftId(id: number) {
    setPlayer({
      ...player,
      aircraftId: id,
    });
    save({
      ...player,
      aircraftId: id,
    });
  }

  function setWeaponId(id: number) {
    setPlayer({
      ...player,
      weaponId: id,
    });
    save({
      ...player,
      weaponId: id,
    });
  }

  function setLevelId(id: number) {
    setPlayer({
      ...player,
      levelId: id,
    });
    console.log("setLevelId", id);
    save({
      ...player,
      levelId: id,
    });
  }

  return [player, setAircraftId, setWeaponId, setLevelId];
}
