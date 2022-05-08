import {
  getEnemyAircraftById,
  resolveAircraftImagePath,
} from "../data/aircraft/aircraft";
import { SpawnConfigs } from "../data/level/level";
import { getEnemyWeaponById, getWeaponById } from "../data/weapon/weapon";
import { resizeToCanvas } from "./common";
import { GameManager } from "./gameManager";
import { Enemy } from "./gameObjects/enemy";
import { Faction, GameObject } from "./gameObjects/gameObject";
import { Vector2D } from "./vector";

function _randInt(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MAX_TOTAL_SPAWNS = 5;

export class EnemySpawner extends GameObject {
  private spawnConfigs: SpawnConfigs;
  private numSpawned: number[];
  private timers: number[];
  private coolDowns: number[];
  private totalSpawns: number;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    ctx: CanvasRenderingContext2D,
    spawnConfig: SpawnConfigs,
    gameManager: GameManager
  ) {
    super(position, velocity, ctx, Faction.Enemy, gameManager);
    this.spawnConfigs = spawnConfig;
    this.numSpawned = [];
    this.timers = [];
    this.coolDowns = [];

    this.spawnConfigs.enemies.forEach((config, index) => {
      this.numSpawned.push(0);
      this.timers.push(0);
      this.coolDowns.push(_randInt(config.rate.low, config.rate.high));
    });

    this.totalSpawns = 0;
  }

  public update(deltaTime: number): void {
    const gameManager = this._gameManager;
    const spawnConfigs = this.spawnConfigs.enemies;
    this.timers.forEach((value, index) => {
      // update timer
      this.timers[index] += deltaTime;

      // try spawning a new enemy if cooldown is reached
      if (
        this.timers[index] > this.coolDowns[index] &&
        this.numSpawned[index] < spawnConfigs[index].maxCount &&
        this.totalSpawns < MAX_TOTAL_SPAWNS
      ) {
        // refresh cooldown timer
        this.timers[index] = 0;
        this.coolDowns[index] = _randInt(
          spawnConfigs[index].rate.low,
          spawnConfigs[index].rate.high
        );

        // update count
        this.numSpawned[index]++;
        this.totalSpawns++;

        const aircraft = getEnemyAircraftById(spawnConfigs[index].aircraftId)!;
        const weapon = getEnemyWeaponById(spawnConfigs[index].weaponId);
        const enemy = new Enemy(
          index,
          spawnConfigs[index],
          aircraft,
          weapon,
          gameManager,
          new Vector2D(_randInt(50, gameManager.ctx!.canvas.width - 50), -50),
          new Vector2D(0, aircraft.speed),
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
    this.totalSpawns--;
  }
}
