import React from "react";
import { GameObject } from "./gameObjects/gameObject";
import { SpriteGameObject } from "./gameObjects/spriteGameObject";
import { Vector2D } from "./vector";

import "../assets/aircraft/Interceptor.png";

export class GameManager {
  gameLevelId: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  renderingHandler: number;
  gameObjects: GameObject[];

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.gameLevelId = -1;
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.renderingHandler = -1;
    this.gameObjects = [];
  }

  initCtx() {
    this.ctx = this.canvasRef!.current!.getContext("2d");
    this.gameObjects.push(
      new SpriteGameObject(
        new Vector2D(20, this.ctx!.canvas.height - 60),
        new Vector2D(1, 0),
        this.ctx,
        39,
        45,
        "../src/assets/aircraft/Interceptor.png"
      )
    );
  }

  renderLoop() {
    this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);

    this.gameObjects.forEach((gameObject) => {
      gameObject.update();
    });

    this.gameObjects.forEach((gameObject) => {
      gameObject.draw();
    });

    requestAnimationFrame(() => {
      this.renderLoop();
    });
  }

  run() {
    if (!this.ctx) {
      console.log("ctx is null");
      this.initCtx();
    }
    requestAnimationFrame(() => {
      this.renderLoop();
    });
  }
}
