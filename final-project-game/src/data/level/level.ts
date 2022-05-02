import LEVELS from "./level.json";

export interface Level {
  id: number;
  difficulty: number;
  name: string;
}

export function loadLevels(): Level[] {
  return LEVELS;
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
