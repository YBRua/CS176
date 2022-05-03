import { Vector2D } from "../vector";

export class GameObject {
  position: Vector2D | null;
  velocity: Vector2D;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    position: Vector2D | null = null,
    velocity: Vector2D | null = null,
    ctx: CanvasRenderingContext2D | null = null
  ) {
    this.position = position;
    this.ctx = ctx;

    if (velocity) {
      this.velocity = velocity;
    } else {
      this.velocity = new Vector2D(0, 0);
    }
  }

  public draw(): void {
    return;
  }

  public update(): void {
    return;
  }
}
