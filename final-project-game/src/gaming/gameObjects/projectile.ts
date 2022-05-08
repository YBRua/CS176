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
      // prevent collision event with other projectiles
      return;
    }

    if (other.faction !== this.faction) {
      other.hp -= this.damage;

      if (other.faction === Faction.Player) {
        this._gameManager.setPlayerHPState(other.hp);
      }

      if (other.hp <= 0) {
        // when HP of an entity reaches zero

        if (other.faction === Faction.Enemy) {
          // enemy destroyed, update player's score
          this._gameManager.playerObject!.score += other.score;
          this._gameManager.setScoreState(
            this._gameManager.playerObject!.score
          );
        }

        if (other.faction === Faction.Player) {
          // player destroyed, game ends
          this._gameManager.toggleEndGame();
        }

        // destroy the eneity
        this._gameManager.destroyGameObject(other);
      }

      // destroy the projectile
      this._gameManager.destroyGameObject(this);
    }
  }
}
