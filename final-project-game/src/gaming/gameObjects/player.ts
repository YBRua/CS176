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

class PlayerFireControl {
  private _player: Player;
  private _gameManager: GameManager;
  constructor(player: Player, gameManager: GameManager) {
    this._player = player;
    this._gameManager = gameManager;
  }

  private _buildProjectile(
    position: Vector2D,
    initSpeed: Vector2D | null = null
  ): Projectile {
    const player = this._player;
    const weapon = player.weapon;
    const projectile = new Projectile(
      weapon.pathType === "circle" ? PathType.Circle : PathType.Rectangle,
      position,
      initSpeed ? initSpeed : new Vector2D(0, -weapon.projectileSpeed),
      weapon.damage,
      this._gameManager.ctx!,
      weapon.width,
      weapon.height,
      "white",
      Faction.Player,
      this._gameManager
    );

    return projectile;
  }

  private _singleShot(): Projectile[] {
    const player = this._player;
    const weapon = player.weapon;
    let projectilePos: Vector2D;
    if (weapon.pathType === "circle") {
      projectilePos = player.position.addX(player.width / 2);
    } else {
      projectilePos = player.position
        .addX(player.width / 2)
        .addX(-player.weapon.width / 2)
        .addY(-player.weapon.height / 4);
    }
    const projectile = this._buildProjectile(projectilePos);
    return [projectile];
  }

  private _doubleShot(): Projectile[] {
    const player = this._player;
    const weapon = player.weapon;
    let projectilePos1, projectilePos2: Vector2D;
    if (weapon.pathType === "circle") {
      projectilePos1 = player.position.addY(player.height / 2);
      projectilePos2 = player.position
        .addX(player.width)
        .addX(-player.weapon.width)
        .addY(player.height / 2);
    } else {
      projectilePos1 = player.position.addY(player.height / 2);
      projectilePos2 = player.position
        .addX(player.width)
        .addX(-player.weapon.width)
        .addY(player.height / 2);
    }
    const projectile1 = this._buildProjectile(projectilePos1);
    const projectile2 = this._buildProjectile(projectilePos2);
    return [projectile1, projectile2];
  }

  private _burstShot(): Projectile[] {
    const player = this._player;
    const weapon = player.weapon;
    let projectilePos: Vector2D;
    projectilePos = player.position.addX(player.width / 2);
    return [
      this._buildProjectile(
        projectilePos,
        new Vector2D(-0.2, 1).normalize().scale(-weapon.projectileSpeed)
      ),
      this._buildProjectile(projectilePos),
      this._buildProjectile(
        projectilePos,
        new Vector2D(0.2, 1).normalize().scale(-weapon.projectileSpeed)
      ),
    ];
  }

  public tryFiringProjectile(): void {
    const gameManager = this._gameManager;
    const player = this._player;
    const weapon = player.weapon;
    if (gameManager.playerObject && player.cdManager.canFire()) {
      let projectiles: Projectile[];
      if (weapon.barrels === 1) {
        projectiles = this._singleShot();
      } else if (weapon.barrels === 2) {
        projectiles = this._doubleShot();
      } else if (weapon.barrels === 3) {
        projectiles = this._burstShot();
      } else {
        projectiles = [];
      }
      projectiles.forEach((projectile) => {
        gameManager.gameObjects.add(projectile);
      });
      player.cdManager.step();
    }
  }
}

export class Player extends SpriteGameObject {
  aircraft: Aircraft;
  weapon: Weapon;
  movementState: MovementState;
  isFiring: boolean;
  cdManager: CooldownManager;
  fireControl: PlayerFireControl;

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
    this.fireControl = new PlayerFireControl(this, gameManager);
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

  public setIsFiring(isFiring: boolean): void {
    this.isFiring = isFiring;
  }

  public override update(timeDelta: number): void {
    // this.drawCollider();
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
      this.fireControl.tryFiringProjectile();
    }
  }
}
