import React from "react";

export class GameManager {
  gameLevelId: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  renderingHandler: number;
  _debugX: number;
  _debugY: number;
  dx: number;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.gameLevelId = -1;
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.renderingHandler = -1;
    this._debugX = 20;
    this._debugY = 20;
    this.dx = 5;
  }

  initCtx() {
    this.ctx = this.canvasRef!.current!.getContext("2d");
  }

  _debug_draw() {
    this.ctx!.beginPath();
    this.ctx!.strokeStyle = "white";
    this.ctx!.rect(this._debugX, this._debugY, 150, 100);
    this.ctx!.stroke();
    if (
      this._debugX + this.dx + 150 > this.canvasRef!.current!.width ||
      this._debugX + this.dx < 0
    ) {
      this.dx = -this.dx;
    }
    this._debugX += this.dx;
  }

  run() {
    if (!this.ctx) {
      console.log("ctx is null");
      this.initCtx();
    }
    this.renderingHandler = setInterval(() => {
      this.ctx!.clearRect(0, 0, this.canvasRef!.current!.width, this.canvasRef!.current!.height);
      this._debug_draw();
    }, 1000 / 60);
  }
}
