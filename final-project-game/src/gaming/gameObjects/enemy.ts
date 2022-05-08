import { Aircraft } from "../../data/aircraft/aircraft";
import { Weapon } from "../../data/weapon/weapon";
import { resizeToCanvas, SPEED_SCALE } from "../common";
import { CooldownManager } from "../cooldownManager";
import {
  BaseFireControl,
  DirectShootFireControl,
  PlayerTrackingFireControl,
} from "../enemy/fireControl";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction, GameObject } from "./gameObject";
import { PathType } from "./pathGameObject";
import { Projectile } from "./projectile";
import { SpriteGameObject } from "./spriteGameObject";

export class BasicEnemy extends SpriteGameObject {
  aircraft: Aircraft;
  weapon: Weapon;
  spawnConfigId: number;
  private _fireControl: BaseFireControl;
  private _cdManager: CooldownManager;

  constructor(
    spawnConfigId: number,
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

    this.spawnConfigId = spawnConfigId;
    this._fireControl = new PlayerTrackingFireControl(gameManager, this);
    this._cdManager = new CooldownManager(this.weapon.cooldown, this.weapon.cooldown, 1);

    this.hp = this.aircraft.hp;
    this.isCollidable = true;
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
    const deltaPos = this.velocity.scale(timeDelta * SPEED_SCALE);
    const border = this.ctx!.canvas.height / 3;
    if (this.position.y + deltaPos.y + this.height < border) {
      this.position = Vector2D.add(this.position, deltaPos);
    }
    this._fireProjectile();
  }

  public onDestroy(): void {
    this._gameManager.enemySpawner!.informEnemyDestruction(this.spawnConfigId);
  }
}
