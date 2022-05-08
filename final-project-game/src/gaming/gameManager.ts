import React from "react";
import { GameObject } from "./gameObjects/gameObject";
import { Vector2D } from "./vector";

import "../assets/aircraft/Interceptor.png";
import { Player } from "./gameObjects/player";
import { PlayerConfig } from "../hooks/usePlayerConfig";
import {
  getAircraftById,
  resolveAircraftImagePath,
} from "../data/aircraft/aircraft";
import { getWeaponById } from "../data/weapon/weapon";
import { EnemySpawner } from "./enemySpawner";
import { getSpawnScriptById } from "../data/level/level";

export class GameManager {
  gameLevelId: number;

  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;

  gameObjects: Set<GameObject>;
  playerObject: Player | null;
  playerConfig: PlayerConfig | null;
  enemySpawner: EnemySpawner | null;

  prevTimeStamp: number;
  setPlayerHP: (hp: number) => void;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.gameLevelId = -1;
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.playerConfig = null;
    this.prevTimeStamp = 0;

    this.gameObjects = new Set();
    this.playerObject = null;
    this.enemySpawner = null;
    this.setPlayerHP = (hp: number) => {};
  }

  public setPlayerConfig(playerConfig: PlayerConfig) {
    this.playerConfig = playerConfig;
  }

  public init(levelId: number) {
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
        new Vector2D(this.ctx!.canvas.width / 2, this.ctx!.canvas.height - 60),
        new Vector2D(0, 0),
        this.ctx!,
        Math.round(aircraft.canvasWidth / 3),
        Math.round(aircraft.canvasHeight / 3),
        resolveAircraftImagePath(aircraft),
        this
      );

      this.gameObjects.add(this.playerObject);
      this.setPlayerHP(aircraft.hp);
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

  public run() {
    if (!this.ctx) {
      console.error("ctx is null");
    }
    requestAnimationFrame((t) => {
      this.eventLoop(t);
    });
  }

  public destroyGameObject(gameObject: GameObject) {
    gameObject.onDestroy();
    this.gameObjects.delete(gameObject);
  }
}
