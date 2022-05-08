import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction } from "./gameObject";
import { PhysicalGameObject } from "./physicalGameObject";

export class SpriteGameObject extends PhysicalGameObject {
  imageSrc: string | null;
  sprite: HTMLImageElement | null;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number = 0,
    height: number = 0,
    imageSrc: string,
    faction: Faction,
    gameManager: GameManager
  ) {
    super(position, velocity, ctx, width, height, faction, gameManager);
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

  public override update(timeDelta: number): void {
    if (this.position && this.velocity) {
      const deltaPos = Vector2D.scale(this.velocity, timeDelta * 0.001);
      if (
        this.position.x + deltaPos.x + this.width < this.ctx!.canvas.width &&
        this.position.x + deltaPos.x > 0
      ) {
        this.position = Vector2D.add(this.position, deltaPos);
      }
    }
  }
}
