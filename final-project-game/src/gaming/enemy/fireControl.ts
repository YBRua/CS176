import { resizeToCanvas } from "../common";
import { GameManager } from "../gameManager";
import { BasicEnemy } from "../gameObjects/enemy";
import { Faction } from "../gameObjects/gameObject";
import { PathType } from "../gameObjects/pathGameObject";
import { Projectile } from "../gameObjects/projectile";
import { Vector2D } from "../vector";

export class BaseFireControl {
  protected _gameManager: GameManager;
  protected _enemy: BasicEnemy;

  constructor(gameManager: GameManager, enemy: BasicEnemy) {
    this._gameManager = gameManager;
    this._enemy = enemy;
  }

  public getFireDirection(): Vector2D {
    return new Vector2D(0, 1);
  }

  public fire(): void {
    const direction = this.getFireDirection();
    const newProjectile = new Projectile(
      PathType.Circle,
      this._enemy.position
        .addX(resizeToCanvas(this._enemy.aircraft.canvasWidth / 2))
        .addY(resizeToCanvas(this._enemy.aircraft.canvasHeight)),
      direction.scale(this._enemy.weapon.projectileSpeed),
      this._enemy.weapon.damage,
      this._gameManager.ctx!,
      7,
      7,
      "red",
      Faction.Enemy,
      this._gameManager
    );
    this._gameManager.gameObjects.add(newProjectile);
  }
}

export class DirectShootFireControl extends BaseFireControl {
  constructor(gameManager: GameManager, enemy: BasicEnemy) {
    super(gameManager, enemy);
  }

  public override getFireDirection(): Vector2D {
    return new Vector2D(0, this._enemy.weapon.projectileSpeed).normalize();
  }
}

export class PlayerTrackingFireControl extends BaseFireControl {
  constructor(gameManager: GameManager, enemy: BasicEnemy) {
    super(gameManager, enemy);
  }

  public override getFireDirection(): Vector2D {
    const playerPosition = this._gameManager.playerObject!.position;
    const direction = playerPosition.subtract(this._enemy.position);
    return direction.normalize();
  }
}
