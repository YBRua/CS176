import { Vector2D } from "../vector";
import { GameObject } from "./gameObject";

export class PhysicalGameObject extends GameObject {
  width: number;
  height: number;

  constructor(
    position: Vector2D | null = null,
    velocity: Vector2D | null = null,
    ctx: CanvasRenderingContext2D | null = null,
    width: number = 0,
    height: number = 0
  ) {
    super(position, velocity, ctx);
    this.width = width;
    this.height = height;
  }
}
