import { Enemy } from "../gameObjects/enemy";
import { Vector2D } from "../vector";

export function getMovementAI(
  enemy: Enemy,
  movementType: string
): BaseMovementAI {
  switch (movementType) {
    case "Direct":
      return new DirectMovementAI(enemy);
    case "XAxis":
      return new XAxisMovementAI(enemy);
  }
  throw new Error("Unknown movement type: " + movementType);
}

export class BaseMovementAI {
  constructor(protected _gameObject: Enemy) {}

  public update(delta: number): Vector2D {
    /**
     * Base method for movement AI.
     * This method should update the position of _gameObject
     * And return a new velocity for the _gameObject
     */
    return new Vector2D(0, 0);
  }
}

export class DirectMovementAI extends BaseMovementAI {
  constructor(_gameObject: Enemy) {
    super(_gameObject);
  }

  public override update(delta: number): Vector2D {
    /**
     * Direct movement AI.
     * Move forward at a constant speed
     * until reaching the top 1/3 position of the canvas
     */
    const gameObject = this._gameObject;
    const deltaPos = gameObject.velocity.scale(delta);
    const border = gameObject.ctx!.canvas.height / 3;

    if (gameObject.position.y + deltaPos.y + gameObject.height < border) {
      gameObject.position = Vector2D.add(gameObject.position, deltaPos);
      return gameObject.velocity;
    }
    return new Vector2D(0, 0);
  }
}

export class XAxisMovementAI extends BaseMovementAI {
  // use _state to track movement state
  // 0 for moving forward
  // 1 for moving horizontally
  private _state;
  constructor(_gameObject: Enemy) {
    super(_gameObject);
    this._state = 0;
  }

  public override update(delta: number): Vector2D {
    /**
     * X-Axis movement AI.
     * Move forward at a constant speed
     * until reaching the top 1/3 position of the canvas
     * Then move along the x-axis at a constant speed
     */
    const gameObject = this._gameObject;
    const deltaPos = gameObject.velocity.scale(delta);
    const canvas = gameObject.ctx!.canvas;
    const border = canvas.height / 3;

    // move forward
    if (
      this._state === 0 &&
      gameObject.position.y + deltaPos.y + gameObject.height < border
    ) {
      gameObject.position = Vector2D.add(gameObject.position, deltaPos);
      return gameObject.velocity;
    }
    // move horizontally
    else {
      this._state = 1;
      if (gameObject.velocity.x > 0) {
        // move right
        if (
          gameObject.position.x + deltaPos.x + gameObject.width <
          canvas.width
        ) {
          // can move right
          gameObject.position = gameObject.position.add(deltaPos);
          return new Vector2D(gameObject.aircraft.speed, 0);
        } else {
          // cannot move right
          return new Vector2D(-gameObject.aircraft.speed, 0);
        }
      } else {
        // move left
        if (gameObject.position.x + deltaPos.x > 0) {
          // can move left
          gameObject.position = gameObject.position.add(deltaPos);
          return new Vector2D(-gameObject.aircraft.speed, 0);
        } else {
          // cannot move left
          return new Vector2D(gameObject.aircraft.speed, 0);
        }
      }
    }
  }
}
