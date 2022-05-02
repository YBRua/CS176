import WEAPONS from './weapon.json';


export interface Weapon {
    id: number;
    name: string;
    description: string;
    cooldown: number;
    damage: number;
}

export function loadWeapons(): Weapon[] {
    return WEAPONS;
}

export function getWeaponById(id: number): Weapon | null {
    return WEAPONS.find((weapon) => weapon.id === id) || null;
}