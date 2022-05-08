import LEVELS from "./level.json";
import SPAWN_CONFIGS from "./spawnConfig.json";

export interface Level {
  id: number;
  difficulty: number;
  name: string;
}

export interface SpawnConfigs {
  id: number;
  enemies: EnemySpawnConfig[];
}

interface SpawnRateRange {
  low: number;
  high: number;
}

export interface EnemySpawnConfig {
  id: number;
  rate: SpawnRateRange;
  maxCount: number;
  fireControl: string;
  movement: string;
  weaponId: number;
  aircraftId: number;
}

export function loadLevels(): Level[] {
  return LEVELS;
}

export function getSpawnScriptById(id: number): SpawnConfigs {
  const cfg = SPAWN_CONFIGS.find((spawnConfig) => spawnConfig.id === id);
  if (!cfg) {
    throw new Error(`Spawn config ${id} not found`);
  }
  return cfg;
}

export function getLevelById(id: number): Level | null {
  return LEVELS.find((level) => level.id === id) || null;
}

export function difficultyToString(difficulty: number): string {
  switch (difficulty) {
    case 1:
      return "Easy";
    case 2:
      return "Normal";
    case 3:
      return "Hard";
    default:
      return "Buggy";
  }
}
