import I5M3 from "../../assets/aircraft/I5M3.png";
import F168 from "../../assets/aircraft/F-168.png";
import I5M3Padded from "../../assets/aircraft/I5M3-boxed.png";
import F168Padded from "../../assets/aircraft/F-168-boxed.png";

import Enemy from "../../assets/aircraft/EnemyFighter.png";
import EnemyPadded from "../../assets/aircraft/EnemyFighter-boxed.png";

import AIRCRAFTS from "./aircraft.json";
import ENEMY_AIRCRAFTS from "./enemy.json";

export interface Aircraft {
  id: number;
  name: string;
  nickname: string;
  description: string;
  image: string;
  speed: number;
  hp: number;
  canvasWidth: number;
  canvasHeight: number;
}

export function loadAircrafts(): Aircraft[] {
  return AIRCRAFTS;
}

export function loadEnemyAircrafts(): Aircraft[] {
  return ENEMY_AIRCRAFTS;
}

export function getEnemyAircraftById(id: number): Aircraft {
  const aircraft = ENEMY_AIRCRAFTS.find((aircraft) => aircraft.id === id);
  if (!aircraft) {
    throw new Error(`Aircraft ${id} not found`);
  }
  return aircraft;
}

export function getAircraftById(id: number): Aircraft {
  const aircraft = AIRCRAFTS.find((aircraft) => aircraft.id === id);
  if (!aircraft) {
    throw new Error(`Aircraft ${id} not found`);
  }
  return aircraft;
}

export function loadAircraftImage(
  aircraft: Aircraft,
  padding: boolean = false
): HTMLImageElement {
  let img = new Image();
  let imageSrc: string = "";
  switch (aircraft.image) {
    case "I5M3":
      imageSrc = padding ? I5M3Padded : I5M3;
      break;
    case "F-168":
      imageSrc = padding ? F168Padded : F168;
      break;
    case "EnemyFighter":
      imageSrc = padding ? EnemyPadded : Enemy;
      break;
  }
  img.src = imageSrc;
  return img;
}

export function resolveAircraftImagePath(
  aircraft: Aircraft,
  padding: boolean = false
): string {
  switch (aircraft.image) {
    case "I5M3":
      return padding ? I5M3Padded : I5M3;
    case "F-168":
      return padding ? F168Padded : F168;
    case "EnemyFighter":
      return padding ? EnemyPadded : Enemy;
    default:
      return "";
  }
}
