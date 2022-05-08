import { resizeToCanvas } from "../common";
import { GameManager } from "../gameManager";
import { Enemy } from "../gameObjects/enemy";
import { Faction } from "../gameObjects/gameObject";
import { PathType } from "../gameObjects/pathGameObject";
import { Projectile } from "../gameObjects/projectile";
import { Vector2D } from "../vector";

export function getFireControl(
  enemy: Enemy,
  fireControlType: string
): BaseFireControl {
  if (fireControlType === "Direct") {
    return new DirectShootFireControl(enemy._gameManager, enemy);
  } else if (fireControlType === "Tracking") {
    return new PlayerTrackingFireControl(enemy._gameManager, enemy);
  } else if (fireControlType === "Trishot") {
    return new TriShotFireControl(enemy._gameManager, enemy);
  }
  throw new Error("Unknown fire control type: " + fireControlType);
}

export class BaseFireControl {
  protected _gameManager: GameManager;
  protected _enemy: Enemy;

  constructor(gameManager: GameManager, enemy: Enemy) {
    this._gameManager = gameManager;
    this._enemy = enemy;
  }

  public getFireDirections(): Vector2D[] {
    return [new Vector2D(0, 1)];
  }

  public fire(): void {
    const directions = this.getFireDirections();
    const weapon = this._enemy.weapon;
    for (const direction of directions) {
      let projectilePos: Vector2D;
      if (weapon.pathType === "circle") {
        projectilePos = this._enemy.position
          .addX(resizeToCanvas(this._enemy.aircraft.canvasWidth / 2))
          .addY(resizeToCanvas(this._enemy.aircraft.canvasHeight));
      } else {
        projectilePos = this._enemy.position
          .addX(resizeToCanvas(this._enemy.aircraft.canvasWidth / 2))
          .addX(resizeToCanvas(-weapon.width / 2))
          .addY(resizeToCanvas(this._enemy.aircraft.canvasHeight));
      }

      const newProjectile = new Projectile(
        weapon.pathType === "circle" ? PathType.Circle : PathType.Rectangle,
        projectilePos,
        direction.scale(this._enemy.weapon.projectileSpeed),
        this._enemy.weapon.damage,
        this._gameManager.ctx!,
        this._enemy.weapon.width,
        this._enemy.weapon.height,
        "red",
        Faction.Enemy,
        this._gameManager
      );
      this._gameManager.gameObjects.add(newProjectile);
    }
  }
}

export class DirectShootFireControl extends BaseFireControl {
  constructor(gameManager: GameManager, enemy: Enemy) {
    super(gameManager, enemy);
  }

  public override getFireDirections(): Vector2D[] {
    return [new Vector2D(0, this._enemy.weapon.projectileSpeed).normalize()];
  }
}

export class PlayerTrackingFireControl extends BaseFireControl {
  constructor(gameManager: GameManager, enemy: Enemy) {
    super(gameManager, enemy);
  }

  public override getFireDirections(): Vector2D[] {
    const playerPosition = this._gameManager.playerObject!.position;
    const direction = playerPosition.subtract(this._enemy.position);
    return [direction.normalize()];
  }
}

export class TriShotFireControl extends BaseFireControl {
  constructor(gameManager: GameManager, enemy: Enemy) {
    super(gameManager, enemy);
  }

  public override getFireDirections(): Vector2D[] {
    return [
      new Vector2D(-20, 40).normalize(),
      new Vector2D(0, 1),
      new Vector2D(20, 40).normalize(),
    ];
  }
}
