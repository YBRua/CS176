import { Aircraft, getAircraftById } from "../../data/aircraft/aircraft";
import { getWeaponById, Weapon } from "../../data/weapon/weapon";
import { PlayerConfig } from "../../hooks/usePlayerConfig";
import { Vector2D } from "../vector";
import { SpriteGameObject } from "./spriteGameObject";

const PLAYER_ID = 0;

export class Player extends SpriteGameObject {
  playerConfig: PlayerConfig;
  aircraft: Aircraft;
  weapon: Weapon;

  constructor(
    playerConfig: PlayerConfig,
    position: Vector2D | null = null,
    velocity: Vector2D | null = null,
    ctx: CanvasRenderingContext2D | null = null,
    width: number = 0,
    height: number = 0,
    imageSrc: string | null = null
  ) {
    super(position, velocity, ctx, width, height, imageSrc);
    this.id = PLAYER_ID;

    this.playerConfig = playerConfig;
    this.aircraft = getAircraftById(playerConfig.aircraftId)!;
    this.weapon = getWeaponById(playerConfig.weaponId)!;
  }

  public setVelocity(velocity: Vector2D): void {
    this.velocity = velocity;
  }

  public moveLeft(): void {
    this.velocity = new Vector2D(- this.aircraft.speed, 0);
  }

  public moveRight(): void {
    this.velocity = new Vector2D(this.aircraft.speed, 0);
  }

  public clearMove(): void {
    this.velocity = new Vector2D(0, 0);
  }
}
