import { Aircraft, getAircraftById } from "../../data/aircraft/aircraft";
import { getWeaponById, Weapon } from "../../data/weapon/weapon";
import { PlayerConfig } from "../../hooks/usePlayerConfig";
import { resizeToCanvas, SPEED_SCALE } from "../common";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { PathType } from "./pathGameObject";
import { Projectile } from "./projectile";
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
  canFire: boolean;
  isFiring: boolean;

  constructor(
    playerConfig: PlayerConfig,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number = 0,
    height: number = 0,
    imageSrc: string
  ) {
    super(position, velocity, ctx, width, height, imageSrc);
    this.id = PLAYER_ID;

    this.playerConfig = playerConfig;
    this.aircraft = getAircraftById(playerConfig.aircraftId)!;
    this.weapon = getWeaponById(playerConfig.weaponId)!;

    this.movementState = MovementState.Idle;

    this.canFire = true;
    this.isFiring = false;
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

  private _fireProjectile(gameManager: GameManager): void {
    if (gameManager.playerObject && this.canFire) {
      const playerObject = gameManager.playerObject;
      const aircraft = playerObject.aircraft;

      const newProjectile = new Projectile(
        PathType.Circle,
        gameManager.playerObject.position.addX(
          resizeToCanvas(aircraft.canvasWidth / 2)
        ),
        new Vector2D(0, -gameManager.playerObject.weapon.projectileSpeed),
        gameManager.ctx!,
        10,
        10
      );

      gameManager.gameObjects.add(newProjectile);
      this.canFire = false;

      setTimeout(() => {
        this.canFire = true;
      }, gameManager.playerObject.weapon.cooldown * 100);
    }
  }

  public setIsFiring(isFiring: boolean): void {
    this.isFiring = isFiring;
  }

  public override update(timeDelta: number, gameManager: GameManager): void {
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

    if (this.isFiring) {
      this._fireProjectile(gameManager);
    }
  }
}
