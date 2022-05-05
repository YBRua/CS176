import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";

export class GameObject {
  position: Vector2D;
  velocity: Vector2D;
  ctx: CanvasRenderingContext2D;
  id: number;

  static uid: number = 10;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D
  ) {
    if (position) {
      this.position = position;
    } else {
      this.position = new Vector2D(0, 0);
    }
    this.ctx = ctx;

    if (velocity) {
      this.velocity = velocity;
    } else {
      this.velocity = new Vector2D(0, 0);
    }

    this.id = GameObject.uid++;
  }

  public draw(): void {
    return;
  }

  public update(deltaTime: number, gameManager: GameManager): void {
    return;
  }

  public getId(): number {
    return this.id;
  }
}
