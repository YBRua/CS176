import { GameManager } from "../gameManager";
import { Vector2D } from "../vector";

export enum Faction {
  Player = 0,
  Enemy = 1,
}

export class GameObject {
  id: number;
  position: Vector2D;
  velocity: Vector2D;
  isCollidable: boolean;
  ctx: CanvasRenderingContext2D;
  faction: Faction;
  hp: number;
  damage: number;
  _gameManager: GameManager;

  static uid: number = 10;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    faction: Faction,
    gameManager: GameManager
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
    this._gameManager = gameManager;

    this.faction = faction;
    this.hp = 0;
    this.damage = 0;
  }

  public draw(): void {
    return;
  }

  public update(deltaTime: number): void {
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

  public onDestroy(): void {
    return;
  }
}
