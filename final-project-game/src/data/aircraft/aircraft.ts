import "../../assets/aircraft/Interceptor.png";
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
  const imageSrc = `/src/assets/aircraft/${aircraft.image}${
    padding ? "-boxed" : ""
  }.png`;
  img.src = imageSrc;
  return img;
}

export function resolveAircraftImagePath(
  aircraft: Aircraft,
  padding: boolean = false
): string {
  return `/src/assets/aircraft/${aircraft.image}${padding ? "-boxed" : ""}.png`;
}
