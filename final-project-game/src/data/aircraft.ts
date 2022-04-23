import "../assets/aircraft/Interceptor.png";
import AIRCRAFTS from "./aircraft.json";

export interface Aircraft {
  id: number;
  name: string;
  description: string;
  image: string;
  speed: number;
  hp: number;
}

export function loadAircrafts(): Aircraft[] {
  return AIRCRAFTS;
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
