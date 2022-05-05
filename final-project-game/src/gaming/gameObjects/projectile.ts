import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { PathGameObject, PathType } from "./pathGameObject";

export class Projectile extends PathGameObject {
  constructor(
    pathType: PathType,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number = 0,
    height: number = 0
  ) {
    super(pathType, position, velocity, ctx, width, height);
  }

  public override update(timeDelta: number, gameManager: GameManager): void {
    super.update(timeDelta, gameManager);
    if (this.position) {
      if (this.position.y < 0) {
        gameManager.destroyGameObject(this);
      }
    }
  }
}
