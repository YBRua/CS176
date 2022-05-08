import { Aircraft, getAircraftById } from "../../data/aircraft/aircraft";
import { Weapon } from "../../data/weapon/weapon";
import { PlayerConfig } from "../../hooks/usePlayerConfig";
import { resizeToCanvas, SPEED_SCALE } from "../common";
import { CooldownManager } from "../cooldownManager";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction } from "./gameObject";
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
  aircraft: Aircraft;
  weapon: Weapon;
  movementState: MovementState;
  isFiring: boolean;
  cdManager: CooldownManager;

  constructor(
    aircraft: Aircraft,
    weapon: Weapon,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    imageSrc: string,
    gameManager: GameManager
  ) {
    super(
      position,
      velocity,
      ctx,
      width,
      height,
      imageSrc,
      Faction.Player,
      gameManager
    );
    this.id = PLAYER_ID;

    this.aircraft = aircraft;
    this.weapon = weapon;

    this.movementState = MovementState.Idle;

    this.cdManager = new CooldownManager(
      this.weapon.shortCD,
      this.weapon.longCD,
      this.weapon.maxShots
    );
    this.isFiring = false;

    this.hp = this.aircraft.hp;
    this.isCollidable = true;
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

  private _fireProjectile(): void {
    const gameManager = this._gameManager;
    const weapon = this.weapon;
    let projectilePos: Vector2D;
    if (weapon.pathType === "circle") {
      projectilePos = this.position.addX(
        resizeToCanvas(this.aircraft.canvasWidth / 2)
      );
    } else {
      projectilePos = this.position
        .addX(resizeToCanvas(this.aircraft.canvasWidth / 2))
        .addX(this.weapon.width / 2)
        .addY(-this.weapon.height / 4)
    }

    if (gameManager.playerObject && this.cdManager.canFire()) {
      const newProjectile = new Projectile(
        weapon.pathType === "circle" ? PathType.Circle : PathType.Rectangle,
        projectilePos,
        new Vector2D(0, -this.weapon.projectileSpeed),
        this.weapon.damage,
        gameManager.ctx!,
        this.weapon.width,
        this.weapon.height,
        "white",
        Faction.Player,
        this._gameManager
      );

      gameManager.gameObjects.add(newProjectile);

      this.cdManager.step();
    }
  }

  public setIsFiring(isFiring: boolean): void {
    this.isFiring = isFiring;
  }

  public override update(timeDelta: number): void {
    this.drawCollider();
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
      this._fireProjectile();
    }
  }
}
