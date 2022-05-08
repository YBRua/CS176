import WEAPONS from "./weapon.json";
import ENEMY_WEAPONS from "./enemyWeapon.json";

export interface Weapon {
  id: number;
  name: string;
  description: string;
  damage: number;
  projectileSpeed: number;
  longCD: number;
  shortCD: number;
  maxShots: number;
  barrels: number;
  width: number;
  height: number;
  pathType: string;
}

export function loadWeapons(): Weapon[] {
  return WEAPONS;
}

export function getWeaponById(id: number): Weapon {
  const weapon = WEAPONS.find((weapon) => weapon.id === id);
  if (!weapon) {
    throw new Error(`Weapon ${id} not found`);
  }
  return weapon;
}

export function getEnemyWeaponById(id: number): Weapon {
  const weapon = ENEMY_WEAPONS.find((weapon) => weapon.id === id);
  if (!weapon) {
    throw new Error(`Weapon ${id} not found`);
  }
  return weapon;
}
