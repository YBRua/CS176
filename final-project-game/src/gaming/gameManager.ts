import React from "react";
import { GameObject } from "./gameObjects/gameObject";
import { Vector2D } from "./vector";

import "../assets/aircraft/I5M3.png";
import "../assets/aircraft/F-168.png";
import { Player } from "./gameObjects/player";
import { PlayerConfig } from "../hooks/usePlayerConfig";
import {
  getAircraftById,
  resolveAircraftImagePath,
} from "../data/aircraft/aircraft";
import { getWeaponById } from "../data/weapon/weapon";
import { EnemySpawner } from "./enemySpawner";
import { getSpawnScriptById } from "../data/level/level";
import { AudioManager, getBGMPlayer } from "./audioManager";

export class GameManager {
  // level config
  gameLevelId: number;

  // render
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;

  // logic
  gameObjects: Set<GameObject>;
  playerObject: Player | null;
  playerConfig: PlayerConfig | null;
  enemySpawner: EnemySpawner | null;

  // Event loop
  ended: boolean;
  paused: boolean;
  prevTimeStamp: number;

  // bgm
  private _bgm: AudioManager;

  // these functions are reserved for React state setters
  setPlayerHPState: (hp: number) => void;
  setScoreState: (score: number) => void;
  togglePauseState: (paused: boolean) => void;
  toggleEndState: (ended: boolean) => void;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.gameLevelId = -1;
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.playerConfig = null;
    this.prevTimeStamp = 0;

    this.gameObjects = new Set();
    this.playerObject = null;
    this.enemySpawner = null;
    this.paused = false;
    this.ended = false;

    this.setScoreState = (score) => {};
    this.setPlayerHPState = (hp) => {};
    this.togglePauseState = () => {};
    this.toggleEndState = () => {};

    this._bgm = getBGMPlayer();
  }

  public toggleEndGame() {
    this.ended = !this.ended;
    this.prevTimeStamp = 0;

    this.toggleEndState(this.ended);
  }

  public togglePause() {
    /**
     * This function toggles the pause state of the game.
     * It also updates the pause React state to invoke the PauseModal.
     */
    this.paused = !this.paused;
    this.prevTimeStamp = 0;
    if (!this.paused) {
      requestAnimationFrame((t) => {
        this.eventLoop(t);
      });
    }
    this.togglePauseState(this.paused);
  }

  public setPlayerConfig(playerConfig: PlayerConfig) {
    this.playerConfig = playerConfig;
  }

  public reset(): void {
    /**
     * This function resets the game manager to its initial state
     * and destroys all game objects.
     * It is called when the game is reset.
     */
    this.gameObjects.forEach((gameObject) => {
      gameObject.onDestroy();
    });
    this.gameObjects.clear();
    this.playerObject = null;
    this.enemySpawner = null;
    this.prevTimeStamp = 0;
    this.paused = false;
    this.ended = false;

    this.toggleEndState(false);
    this.togglePauseState(false);
    this.setScoreState(0);

    this._bgm.pause();
    this._bgm.reset();
  }

  public init(levelId: number) {
    /**
     * This function initializes the game manager.
     * It should be called before calling run().
     */
    this.gameLevelId = levelId;
    if (!this.playerConfig) {
      console.error("GameManager: PlayerConfig is null");
    }

    this.ctx = this.canvasRef!.current!.getContext("2d");

    const aircraft = getAircraftById(this.playerConfig!.aircraftId)!;
    const weapon = getWeaponById(this.playerConfig!.weaponId);

    if (!this.playerObject) {
      this.playerObject = new Player(
        aircraft,
        weapon,
        new Vector2D(this.ctx!.canvas.width / 2, this.ctx!.canvas.height - 75),
        new Vector2D(0, 0),
        this.ctx!,
        Math.round(aircraft.canvasWidth / 3),
        Math.round(aircraft.canvasHeight / 3),
        resolveAircraftImagePath(aircraft),
        this
      );

      this.gameObjects.add(this.playerObject);
      this.setPlayerHPState(aircraft.hp);
    }

    if (!this.enemySpawner) {
      this.enemySpawner = new EnemySpawner(
        new Vector2D(0, 0),
        new Vector2D(0, 0),
        this.ctx!,
        getSpawnScriptById(this.gameLevelId)!,
        this
      );
      this.gameObjects.add(this.enemySpawner);
    }
  }

  private _collisionDetection() {
    this.gameObjects.forEach((gameObject) => {
      if (gameObject.isCollidable) {
        this.gameObjects.forEach((otherGameObject) => {
          if (
            otherGameObject.isCollidable &&
            gameObject !== otherGameObject &&
            gameObject.faction !== otherGameObject.faction
          ) {
            if (gameObject.isCollidingWith(otherGameObject)) {
              gameObject.onCollision(otherGameObject);
            }
          }
        });
      }
    });
  }

  public eventLoop(timestamp: number) {
    /**
     * This function is the main event loop.
     * It is called every frame.
     * Logic and rendering updates are performed here.
     */
    if (this.paused || this.ended) {
      return;
    }

    if (this.prevTimeStamp === 0) {
      this.prevTimeStamp = timestamp;
    }
    const elapsed = timestamp - this.prevTimeStamp;

    // force focus the canvas so that key events are captured
    this.ctx!.canvas.focus();

    this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);

    this._collisionDetection();

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(elapsed);
    });

    this.gameObjects.forEach((gameObject) => {
      gameObject.draw();
    });

    requestAnimationFrame((t) => {
      this.eventLoop(t);
    });
    this.prevTimeStamp = timestamp;
  }

  public async run() {
    /**
     * This function starts the game.
     * It should be called after calling init().
     */
    if (!this.ctx) {
      console.error("ctx is null");
    }

    this._bgm.loop();

    requestAnimationFrame((t) => {
      this.eventLoop(t);
    });
  }

  public destroyGameObject(gameObject: GameObject) {
    gameObject.onDestroy();
    this.gameObjects.delete(gameObject);
  }
}
