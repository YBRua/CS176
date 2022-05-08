import { SPEED_SCALE } from "../common";
import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";
import { Faction } from "./gameObject";
import { PhysicalGameObject } from "./physicalGameObject";

export enum PathType {
  Circle,
  Rectangle,
}

export class PathGameObject extends PhysicalGameObject {
  pathType: PathType;
  fillColor: string;

  constructor(
    pathType: PathType,
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fillColor: string,
    faction: Faction,
    gameManager: GameManager
  ) {
    super(position, velocity, ctx, width, height, faction, gameManager);
    this.pathType = pathType;
    this.fillColor = fillColor;
  }

  public override update(timeDelta: number): void {
    this.drawCollider();
    if (this.position && this.velocity) {
      const deltaPos = Vector2D.scale(this.velocity, timeDelta * SPEED_SCALE);
      if (
        this.position.x + deltaPos.x + this.width < this.ctx!.canvas.width &&
        this.position.x + deltaPos.x > 0
      ) {
        this.position = Vector2D.add(this.position, deltaPos);
      } else {
        this.velocity = new Vector2D(0, 0);
      }
    }
  }

  public override draw(): void {
    switch (this.pathType) {
      case PathType.Circle:
        this._drawCircle();
        break;
      case PathType.Rectangle:
        this._drawRectangle();
        break;
    }
  }

  private _drawCircle(): void {
    if (this.position) {
      this.ctx!.beginPath();
      this.ctx!.fillStyle = this.fillColor;
      this.ctx!.arc(
        this.position.x + this.width / 2,
        this.position.y + this.width / 2,
        this.width / 2,
        0,
        2 * Math.PI
      );
      this.ctx!.closePath();
      this.ctx!.fill();
    }
  }

  private _drawRectangle(): void {
    if (this.position) {
      this.ctx!.beginPath();
      this.ctx!.fillStyle = this.fillColor;
      this.ctx!.rect(this.position.x, this.position.y, this.width, this.height);
      this.ctx!.closePath();
    }
  }
}
