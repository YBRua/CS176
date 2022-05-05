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
    height: number = 0,
    fillColor: string = "white",
  ) {
    super(pathType, position, velocity, ctx, width, height, fillColor);
  }

  public override update(timeDelta: number, gameManager: GameManager): void {
    super.update(timeDelta, gameManager);
    if (this.position) {
      if (this.position.y < -15 || this.position.y > this.ctx!.canvas.height + 15) {
        gameManager.destroyGameObject(this);
      }
    }
  }
}
