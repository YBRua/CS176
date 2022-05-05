import { Vector2D } from "../vector";

export class GameObject {
  position: Vector2D | null;
  velocity: Vector2D;
  ctx: CanvasRenderingContext2D | null;
  id: number;

  static uid: number = 10;

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

    this.id = GameObject.uid++;
  }

  public draw(): void {
    return;
  }

  public update(): void {
    return;
  }

  public getId(): number {
    return this.id;
  }
}
