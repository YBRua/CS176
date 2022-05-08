import { Aircraft } from "../../data/aircraft/aircraft";
import { EnemySpawnConfig } from "../../data/level/level";
import { Weapon } from "../../data/weapon/weapon";
import { SPEED_SCALE } from "../common";
import { CooldownManager } from "../cooldownManager";
import {
  BaseFireControl,
  DirectShootFireControl,
  getFireControl,
  PlayerTrackingFireControl,
} from "../enemy/fireControl";
import { BaseMovementAI, getMovementAI } from "../enemy/movement";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction } from "./gameObject";
import { SpriteGameObject } from "./spriteGameObject";

export class Enemy extends SpriteGameObject {
  aircraft: Aircraft;
  weapon: Weapon;
  timerIndex: number;
  private _fireControl: BaseFireControl;
  private _cdManager: CooldownManager;
  private _movementControl: BaseMovementAI;

  constructor(
    timerIndex: number,
    spawnConfig: EnemySpawnConfig,
    aircraft: Aircraft,
    weapon: Weapon,
    gameManager: GameManager,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    imageSrc: string
  ) {
    super(
      position,
      velocity,
      ctx,
      width,
      height,
      imageSrc,
      Faction.Enemy,
      gameManager
    );
    this.aircraft = aircraft;
    this.weapon = weapon;

    this.timerIndex = timerIndex;
    this._fireControl = getFireControl(this, spawnConfig.fireControl);
    this._cdManager = new CooldownManager(
      this.weapon.shortCD,
      this.weapon.longCD,
      this.weapon.maxShots
    );
    this._movementControl = getMovementAI(this, spawnConfig.movement);

    this.hp = this.aircraft.hp;
    this.isCollidable = true;
    this.score = 10;
  }

  private _fireProjectile(): void {
    if (
      this._cdManager.canFire() &&
      this.position.y > this._gameManager.ctx!.canvas.height / 5
    ) {
      this._fireControl.fire();
      this._cdManager.step();
    }
  }

  public override update(timeDelta: number): void {
    this.drawCollider();
    this.velocity = this._movementControl.update(timeDelta * SPEED_SCALE);
    this._fireProjectile();
  }

  public onDestroy(): void {
    this._gameManager.enemySpawner!.informEnemyDestruction(this.timerIndex);
  }
}
