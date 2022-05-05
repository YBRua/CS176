import { resizeToCanvas } from "./common";
import { GameManager } from "./gameManager";
import { PathType } from "./gameObjects/pathGameObject";
import { Projectile } from "./gameObjects/projectile";
import { Vector2D } from "./vector";

export class PlayerController {
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  private _fireProjectile() {
    if (this.gameManager.playerObject) {
      const playerObject = this.gameManager.playerObject;
      const aircraft = playerObject.aircraft;
      const newProjectile = new Projectile(
        PathType.Circle,
        this.gameManager.playerObject.position.addX(resizeToCanvas(aircraft.canvasWidth / 2)),
        new Vector2D(0, -this.gameManager.playerObject.weapon.projectileSpeed),
        this.gameManager.ctx!,
        10,
        10
      );
      console.log("Fire")
      this.gameManager.gameObjects.add(newProjectile);
    }
  }

  public keyDownHandler(event: any) {
    event.preventDefault();
    console.log(this.gameManager.playerObject?.aircraft.speed);
    switch (event.key) {
      case "a":
        this.gameManager.playerObject?.moveLeft();
        break;
      case "d":
        this.gameManager.playerObject?.moveRight();
        break;
      case "f":
        this._fireProjectile();
        break;
    }
  }

  public keyUpHandler(event: any) {
    event.preventDefault();
    switch (event.key) {
      case "a":
      case "d":
        this.gameManager.playerObject?.clearMove(event.key);
        break;
    }
  }
}
