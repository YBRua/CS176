import { Vector2D } from "../vector";
import { PhysicalGameObject } from "./physicalGameObject";

export class SpriteGameObject extends PhysicalGameObject {
  imageSrc: string | null;
  sprite: HTMLImageElement | null;

  constructor(
    position: Vector2D | null = null,
    velocity: Vector2D | null = null,
    ctx: CanvasRenderingContext2D | null = null,
    width: number = 0,
    height: number = 0,
    imageSrc: string | null = null
  ) {
    super(position, velocity, ctx, width, height);
    this.imageSrc = imageSrc;
    this.sprite = null;

    if (this.imageSrc) {
      this.sprite = new Image(width, height);
      this.sprite.src = this.imageSrc;
    }
  }

  public override draw(): void {
    if (this.sprite && this.position) {
      this.ctx!.drawImage(
        this.sprite,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  public override update(): void {
    if (this.position && this.velocity) {
      if (
        this.position.x + this.velocity.x + this.width >
          this.ctx!.canvas.width ||
        this.position.x + this.velocity.x < 0
      ) {
        this.velocity = new Vector2D(-this.velocity.x, this.velocity.y);
      }
      this.position = Vector2D.add(this.position, this.velocity);
    }
  }
}
