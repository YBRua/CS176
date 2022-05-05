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

export class GameManager {
  gameLevelId: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  renderingHandler: number;
  gameObjects: GameObject[];
  playerObject: Player | null;
  playerConfig: PlayerConfig | null;
  prevTimeStamp: number;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.gameLevelId = -1;
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.renderingHandler = -1;
    this.gameObjects = [];
    this.playerObject = null;
    this.playerConfig = null;
    this.prevTimeStamp = 0;
  }

  public setPlayerConfig(playerConfig: PlayerConfig) {
    this.playerConfig = playerConfig;
  }

  public initCtx() {
    if (!this.playerConfig) {
      console.error("GameManager: PlayerConfig is null");
    }

    this.ctx = this.canvasRef!.current!.getContext("2d");

    const aircraft = getAircraftById(this.playerConfig!.aircraftId)!;
    const weapon = getWeaponById(this.playerConfig!.weaponId)!;

    if (!this.playerObject) {
      this.playerObject = new Player(
        this.playerConfig!,
        new Vector2D(this.ctx!.canvas.width / 2, this.ctx!.canvas.height - 60),
        new Vector2D(0, 0),
        this.ctx,
        39,
        45,
        resolveAircraftImagePath(aircraft)
      );
      this.gameObjects.push(this.playerObject);
    }
  }

  public renderLoop(timestamp: number) {
    if (this.prevTimeStamp === 0) {
      this.prevTimeStamp = timestamp;
    }
    const elapsed = timestamp - this.prevTimeStamp;

    // force focus the canvas so that key events are captured
    this.ctx!.canvas.focus();

    this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(elapsed);
    });

    this.gameObjects.forEach((gameObject) => {
      gameObject.draw();
    });

    requestAnimationFrame((t) => {
      this.renderLoop(t);
    });
    this.prevTimeStamp = timestamp;
  }

  public run() {
    if (!this.ctx) {
      console.log("ctx is null");
      this.initCtx();
    }
    requestAnimationFrame((t) => {
      this.renderLoop(t);
    });
  }
}
