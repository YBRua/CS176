import { getPlayerPosition } from "./gameplay/movement";
import { MapGrid, CellType, Shape } from "./mapGeneration";
import {
  ICON_BOMB,
  ICON_BONUS,
  ICON_BUFF,
  ICON_PLAYER,
  ICON_TIME,
} from "./svgs";

let map: MapGrid;

export function initMapRendering(m: MapGrid, size: Shape) {
  // render a grid of HTMLDivElements according to given MapGrid
  map = m;

  const container = document.getElementById("checkboard-container")!;
  container.innerHTML = "";

  for (let i = 0; i < size.height; ++i) {
    let row = document.createElement("div");
    row.classList.add("checkboard-row");

    for (let j = 0; j < size.width; ++j) {
      let cell = document.createElement("div");
      cell.classList.add("checkboard-cell");

      switch (map[i][j].type) {
        case CellType.bonus:
          cell.innerHTML = ICON_BONUS;
          break;
        case CellType.bomb:
          cell.innerHTML = ICON_BOMB;
          break;
        case CellType.time:
          cell.innerHTML = ICON_TIME;
          break;
        case CellType.buff:
          cell.innerHTML = ICON_BUFF;
          break;
      }

      row.appendChild(cell);
      map[i][j].div = cell;
    }

    container.appendChild(row);
  }
}

export function drawPlayer(row: number, col: number) {
  map[row][col].div!.innerHTML = ICON_PLAYER;
}

export function redrawPlayer(row: number, col: number) {
  // remove old player icon and draw a new one at [row, col]
  const [oldRow, oldCol] = getPlayerPosition();
  map[oldRow][oldCol].div!.innerHTML = "";

  map[row][col].div!.innerHTML = ICON_PLAYER;
}

export function getCurrentMap(): MapGrid {
  return map;
}
