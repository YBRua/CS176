import { getPlayerPosition } from "./gameplay/movement";
import { MapGrid, CellType, Shape } from "./mapGeneration";
import { BONUS_ICON, PLAYER_ICON } from "./svgs";

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

      if (map[i][j].type === CellType.bonus) {
        cell.innerHTML = BONUS_ICON;
      }

      row.appendChild(cell);
      map[i][j].div = cell;
    }

    container.appendChild(row);
  }
}

export function drawPlayer(row: number, col: number) {
  map[row][col].div!.innerHTML = PLAYER_ICON;
}

export function redrawPlayer(row: number, col: number) {
  // remove old player icon and draw a new one at [row, col]
  const [oldRow, oldCol] = getPlayerPosition();
  map[oldRow][oldCol].div!.innerHTML = "";

  map[row][col].div!.innerHTML = PLAYER_ICON;
}

export function getCurrentMap(): MapGrid {
  return map;
}
