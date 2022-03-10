import * as config from "./common";

export enum CellType {
  normal,
  bonus,
  bomb,
  time,
  buff,
}

interface Cell {
  type: CellType;
  value: number;
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

function generateSpecialCell(
  map: MapGrid,
  size: Shape,
  numCells: number,
  value: number,
  type: CellType
): MapGrid {
  /**
   * Generate random cells of type `type`
   */
  let validCellCount = 0;
  while (validCellCount < numCells) {
    let row = genInt(size.width);
    let col = genInt(size.height);

    if (map[row][col].type != CellType.normal || (row === 0 && col === 0)) {
      // do not place bonus cell at the starting point
      continue;
    } else {
      map[row][col] = { type: type, value: value, div: null };
      validCellCount += 1;
    }
  }

  return map;
}

export function genMap(size: Shape): MapGrid {
  let map: MapGrid = new Array();

  if (size.width * size.height - 1 < config.NUM_BONUS) {
    throw new Error("Too many bonus locations!");
  }

  // generate map
  for (let row = 0; row < size.height; ++row) {
    let rowCells: Array<Cell> = new Array();
    for (let col = 0; col < size.width; ++col) {
      rowCells.push({ type: CellType.normal, value: 0, div: null });
    }
    map.push(rowCells);
  }

  // add bonus cells
  map = generateSpecialCell(
    map,
    size,
    config.NUM_BONUS,
    config.SCORE_PER_BONUS,
    CellType.bonus
  );

  // add bomb cells
  map = generateSpecialCell(
    map,
    size,
    config.NUM_BOMB,
    config.PENALTY_PER_BOMB,
    CellType.bomb
  )

  // add extra time
  map = generateSpecialCell(
    map,
    size,
    config.NUM_TIME,
    config.TIME_PER_TIME,
    CellType.time
  )

  // add buffer
  map = generateSpecialCell(
    map,
    size,
    config.NUM_BUFF,
    config.BUFF_MODIFIER,
    CellType.buff
  )

  return map;
}
