export enum CellType {
  normal,
  bonus,
}

interface Cell {
  type: CellType;
  bonus: number;
  div: HTMLDivElement | null;
}

export interface Shape {
  height: number;
  width: number;
}

export type MapGrid = Array<Array<Cell>>;

function genInt(maxVal: number): number {
  return Math.floor(Math.random() * maxVal);
}

function addBonusCells(
  map: MapGrid,
  size: Shape,
  numBonus: number,
  score: number
): MapGrid {
  /**
   * Generates random bonus cells to the MapGrid
   */
  let validTreasureCount = 0;
  while (validTreasureCount < numBonus) {
    let row = genInt(size.width);
    let col = genInt(size.height);

    if (map[row][col].type != CellType.normal || (row === 0 && col === 0)) {
      // do not place bonus cell at the starting point
      continue;
    } else {
      map[row][col] = { type: CellType.bonus, bonus: score, div: null };
      validTreasureCount += 1;
    }
  }

  return map;
}

export function genMap(size: Shape, numBonus: number, score: number): MapGrid {
  let map: MapGrid = new Array();

  if (size.width * size.height - 1 < numBonus) {
    throw new Error("Too many bonus locations!");
  }

  // generate map
  for (let row = 0; row < size.height; ++row) {
    let rowCells: Array<Cell> = new Array();
    for (let col = 0; col < size.width; ++col) {
      rowCells.push({ type: CellType.normal, bonus: 0, div: null });
    }
    map.push(rowCells);
  }

  map = addBonusCells(map, size, numBonus, score);

  return map;
}
