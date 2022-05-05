import { Aircraft, getAircraftById } from "../../data/aircraft/aircraft";
import { getWeaponById, Weapon } from "../../data/weapon/weapon";
import { PlayerConfig } from "../../hooks/usePlayerConfig";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { SpriteGameObject } from "./spriteGameObject";

export class BasicEnemy extends SpriteGameObject {
  aircraft: Aircraft;
  weapon: Weapon;
  canFire: boolean;
  spawnConfigId: number;

  constructor(
    spawnConfigId: number,
    aircraftConfig: PlayerConfig,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    imageSrc: string
  ) {
    super(position, velocity, ctx, width, height, imageSrc);
    this.aircraft = getAircraftById(aircraftConfig.aircraftId)!;
    this.weapon = getWeaponById(aircraftConfig.weaponId)!;

    this.spawnConfigId = spawnConfigId;

    this.canFire = true;
  }

  public override update(timeDelta: number, gameManager: GameManager): void {}
}
