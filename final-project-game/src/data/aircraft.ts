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
