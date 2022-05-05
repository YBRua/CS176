import {
  getEnemyAircraftById,
  resolveAircraftImagePath,
} from "../data/aircraft/aircraft";
import { SpawnConfigs } from "../data/level/level";
import { getEnemyWeaponById, getWeaponById } from "../data/weapon/weapon";
import { resizeToCanvas } from "./common";
import { GameManager } from "./gameManager";
import { BasicEnemy } from "./gameObjects/enemy";
import { GameObject } from "./gameObjects/gameObject";
import { Vector2D } from "./vector";

function _randInt(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class EnemySpawner extends GameObject {
  private spawnConfigs: SpawnConfigs;
  private numSpawned: number[];
  private timers: number[];
  private coolDowns: number[];

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    spawnConfig: SpawnConfigs
  ) {
    super(position, velocity, ctx);
    this.spawnConfigs = spawnConfig;
    this.numSpawned = [];
    this.timers = [];
    this.coolDowns = [];

    this.spawnConfigs.enemies.forEach((config, index) => {
      this.numSpawned.push(0);
      this.timers.push(0);
      this.coolDowns.push(_randInt(config.rate.low, config.rate.high));
    });
  }

  public update(deltaTime: number, gameManager: GameManager): void {
    const spawnConfigs = this.spawnConfigs.enemies;
    this.timers.forEach((value, index) => {
      // update timer
      this.timers[index] += deltaTime;

      // try spawning a new enemy if cooldown is reached
      if (
        this.timers[index] > this.coolDowns[index] &&
        this.numSpawned[index] < spawnConfigs[index].maxCount
      ) {
        // refresh cooldown timer
        this.timers[index] = 0;
        this.coolDowns[index] = _randInt(
          spawnConfigs[index].rate.low,
          spawnConfigs[index].rate.high
        );

        // update count
        this.numSpawned[index]++;

        // TODO: spawn an enemy
        const aircraft = getEnemyAircraftById(1)!;
        const weapon = getEnemyWeaponById(1);
        const enemy = new BasicEnemy(
          spawnConfigs[index].id,
          aircraft,
          weapon,
          new Vector2D(_randInt(50, gameManager.ctx!.canvas.width - 50), -50),
          new Vector2D(_randInt(-45, 45), aircraft.speed),
          gameManager.ctx!,
          resizeToCanvas(aircraft.canvasWidth),
          resizeToCanvas(aircraft.canvasHeight),
          resolveAircraftImagePath(aircraft)
        );

        gameManager.gameObjects.add(enemy);
      }
    });
  }

  public informEnemyDestruction(enemyId: number): void {
    this.numSpawned[enemyId]--;
  }
}
