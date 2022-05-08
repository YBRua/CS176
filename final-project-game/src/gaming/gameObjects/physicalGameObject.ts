import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction, GameObject } from "./gameObject";

export class PhysicalGameObject extends GameObject {
  width: number;
  height: number;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    faction: Faction,
    gameManager: GameManager
  ) {
    super(position, velocity, ctx, faction, gameManager);
    this.width = width;
    this.height = height;
  }

  public setIsCollidable(isCollidable: boolean): void {
    this.isCollidable = isCollidable;
  }

  public drawCollider(): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "green";
    this.ctx.rect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.ctx.stroke();
  }

  public override isCollidingWith(other: PhysicalGameObject): boolean {
    if (!this.isCollidable) {
      return false;
    }
    if (
      this.position.x < other.position.x + other.width &&
      this.position.x + this.width > other.position.x &&
      this.position.y < other.position.y + other.height &&
      this.height + this.position.y > other.position.y
    ) {
      return true;
    }
    return false;
  }
}
