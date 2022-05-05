import { Aircraft, getAircraftById } from "../../data/aircraft/aircraft";
import { getWeaponById, Weapon } from "../../data/weapon/weapon";
import { PlayerConfig } from "../../hooks/usePlayerConfig";
import { SPEED_SCALE } from "../common";
import { Vector2D } from "../vector";
import { SpriteGameObject } from "./spriteGameObject";

const PLAYER_ID = 0;

export enum MovementState {
  Idle = 0,
  Left,
  Right,
}

export class Player extends SpriteGameObject {
  playerConfig: PlayerConfig;
  aircraft: Aircraft;
  weapon: Weapon;
  movementState: MovementState;

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

    this.movementState = MovementState.Idle;
  }

  public setVelocity(velocity: Vector2D): void {
    this.velocity = velocity;
  }

  public moveLeft(): void {
    this.movementState = MovementState.Left;
  }

  public moveRight(): void {
    this.movementState = MovementState.Right;
  }

  public clearMove(state: MovementState): void {
    if (state === this.movementState) {
      this.movementState = MovementState.Idle;
    }
    if (state === this.movementState) {
      this.movementState = MovementState.Idle;
    }
  }

  private _getVelocity(): Vector2D {
    switch (this.movementState) {
      case MovementState.Left:
        return new Vector2D(-this.aircraft.speed, 0);
      case MovementState.Right:
        return new Vector2D(this.aircraft.speed, 0);
      default:
        return new Vector2D(0, 0);
    }
  }

  public override update(timeDelta: number): void {
    this.velocity = this._getVelocity();
    if (this.position && this.velocity) {
      const deltaPos = Vector2D.scale(this.velocity, timeDelta * SPEED_SCALE);
      if (
        this.position.x + deltaPos.x + this.width < this.ctx!.canvas.width &&
        this.position.x + deltaPos.x > 0
      ) {
        this.position = Vector2D.add(this.position, deltaPos);
      }
    }
  }
}
