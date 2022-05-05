import "../../assets/aircraft/Interceptor.png";
import AIRCRAFTS from "./aircraft.json";
import ENEMY_AIRCRAFTS from "./enemy.json";

export interface Aircraft {
  id: number;
  name: string;
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

export function getAircraftById(id: number): Aircraft | null {
  return AIRCRAFTS.find((aircraft) => aircraft.id === id) || null;
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
