import LEVELS from "./level.json";
import SPAWN_CONFIGS from "./spawnConfig.json";

export interface Level {
  id: number;
  difficulty: number;
  name: string;
}

export interface SpawnConfigs {
  id: number;
  enemies: SpawnConfig[];
}

interface SpawnRateRange {
  low: number;
  high: number;
}

interface SpawnConfig {
  id: number;
  rate: SpawnRateRange;
  maxCount: number;
}

export function loadLevels(): Level[] {
  return LEVELS;
}

export function getSpawnScriptById(id: number): SpawnConfigs | null {
  return SPAWN_CONFIGS.find((spawnConfig) => spawnConfig.id === id) || null;
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
