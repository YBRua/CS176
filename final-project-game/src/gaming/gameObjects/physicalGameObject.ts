import { Vector2D } from "../vector";
import { GameObject } from "./gameObject";

export class PhysicalGameObject extends GameObject {
  width: number;
  height: number;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number = 0,
    height: number = 0
  ) {
    super(position, velocity, ctx);
    this.width = width;
    this.height = height;
  }

  public setIsCollidable(isCollidable: boolean): void {
    this.isCollidable = isCollidable;
  }

  public override isCollidingWith(other: PhysicalGameObject): boolean {
    if (!this.isCollidable) {
      return false;
    }
    if (
      this.position.x < other.position.x + other.width &&
      this.position.x + other.width > other.position.x &&
      this.position.y < other.position.y + other.height &&
      this.height + this.position.y > other.position.y
    ) {
      return true;
    }
    return false;
  }
}
