import { resizeToCanvas } from "./common";
import { GameManager } from "./gameManager";
import { PathType } from "./gameObjects/pathGameObject";
import { MovementState } from "./gameObjects/player";
import { Projectile } from "./gameObjects/projectile";
import { Vector2D } from "./vector";

export class PlayerController {
  private gameManager: GameManager;
  private canFire: boolean;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.canFire = true;
  }

  public keyDownHandler(event: any) {
    event.preventDefault();
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        this.gameManager.playerObject?.moveLeft();
        break;
      case "d":
      case "ArrowRight":
        this.gameManager.playerObject?.moveRight();
        break;
      case " ":
        this.gameManager.playerObject?.setIsFiring(true);
        break;
    }
  }

  public keyUpHandler(event: any) {
    event.preventDefault();
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        this.gameManager.playerObject?.clearMove(MovementState.Left);
        break;
      case "d":
      case "ArrowRight":
        this.gameManager.playerObject?.clearMove(MovementState.Right);
        break;
      case " ":
        this.gameManager.playerObject?.setIsFiring(false);
    }
  }
}
