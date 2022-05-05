import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";

export class GameObject {
  id: number;
  position: Vector2D;
  velocity: Vector2D;
  isCollidable: boolean;
  ctx: CanvasRenderingContext2D;

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
    this.isCollidable = false;
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

  public isCollidingWith(other: GameObject): boolean {
    return false;
  }

  public onCollision(other: GameObject): void {
    return;
  }

}
