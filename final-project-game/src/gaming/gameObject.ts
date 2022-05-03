import { Vector2D } from "./vector";

export class GameObject {
  position: Vector2D | null;
  velocity: Vector2D;

  constructor(
    position: Vector2D | null = null,
    velocity: Vector2D | null = null
  ) {
    this.position = position;

    if (velocity) {
      this.velocity = velocity;
    } else {
      this.velocity = new Vector2D(0, 0);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    return;
  }

  public update(): void {
    return;
  }
}
