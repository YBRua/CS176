import { GameManager } from "./gameManager";

export class PlayerController {
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
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
