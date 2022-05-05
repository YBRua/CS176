import { Aircraft } from "../../data/aircraft/aircraft";
import { Weapon } from "../../data/weapon/weapon";
import { resizeToCanvas, SPEED_SCALE } from "../common";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { PathType } from "./pathGameObject";
import { Projectile } from "./projectile";
import { SpriteGameObject } from "./spriteGameObject";

export class BasicEnemy extends SpriteGameObject {
  aircraft: Aircraft;
  weapon: Weapon;
  canFire: boolean;
  spawnConfigId: number;

  constructor(
    spawnConfigId: number,
    aircraft: Aircraft,
    weapon: Weapon,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    imageSrc: string
  ) {
    super(position, velocity, ctx, width, height, imageSrc);
    this.aircraft = aircraft;
    this.weapon = weapon;

    this.spawnConfigId = spawnConfigId;

    this.canFire = true;
  }

  private _fireProjectile(gameManager: GameManager): void {
    if (this.canFire && this.position.y > gameManager.ctx!.canvas.height / 5) {
      const newProjectile = new Projectile(
        PathType.Circle,
        this.position
          .addX(resizeToCanvas(this.aircraft.canvasWidth / 2))
          .addY(resizeToCanvas(this.aircraft.canvasHeight)),
        new Vector2D(0, this.weapon.projectileSpeed),
        gameManager.ctx!,
        7,
        7,
        "red"
      );

      gameManager.gameObjects.add(newProjectile);
      this.canFire = false;

      setTimeout(() => {
        this.canFire = true;
      }, this.weapon.cooldown * 100);
    }
  }

  public override update(timeDelta: number, gameManager: GameManager): void {
    const deltaPos = this.velocity.scale(timeDelta * SPEED_SCALE);
    const border = this.ctx!.canvas.height / 3;
    if (this.position.y + deltaPos.y + this.height < border) {
      this.position = Vector2D.add(this.position, deltaPos);
    }
    this._fireProjectile(gameManager);
  }
}
