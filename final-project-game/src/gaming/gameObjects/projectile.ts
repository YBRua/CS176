import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction, GameObject } from "./gameObject";
import { PathGameObject, PathType } from "./pathGameObject";

export class Projectile extends PathGameObject {
  constructor(
    pathType: PathType,
    position: Vector2D,
    velocity: Vector2D,
    damage: number,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fillColor: string,
    faction: Faction,
    gameManager: GameManager
  ) {
    super(
      pathType,
      position,
      velocity,
      ctx,
      width,
      height,
      fillColor,
      faction,
      gameManager
    );
    this.damage = damage;
    this.isCollidable = true;
  }

  public override update(timeDelta: number): void {
    super.update(timeDelta);
    if (this.position) {
      if (
        this.position.y < -15 ||
        this.position.y > this.ctx!.canvas.height + 15 ||
        this.velocity.norm() === 0
      ) {
        this._gameManager.destroyGameObject(this);
      }
    }
  }

  public override onCollision(other: GameObject): void {
    if (other instanceof Projectile) {
      return;
    } 
    if (other.faction !== this.faction) {
      other.hp -= this.damage;
      if (other.hp < 0) {
        this._gameManager.destroyGameObject(other);
      }
      this._gameManager.destroyGameObject(this);
    }
  }
}
