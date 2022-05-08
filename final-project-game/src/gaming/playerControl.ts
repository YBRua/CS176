import { GameManager } from "./gameManager";
import { MovementState } from "./gameObjects/player";

export class PlayerController {
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
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
    // console.log(event.key);
    event.preventDefault();
    if (this.gameManager.playerObject) {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          this.gameManager.playerObject.clearMove(MovementState.Left);
          break;
        case "d":
        case "ArrowRight":
          this.gameManager.playerObject.clearMove(MovementState.Right);
          break;
        case " ":
          this.gameManager.playerObject.setIsFiring(false);
          break;
        case "Escape":
          this.gameManager.togglePause();
          break;
      }
    }
  }
}
