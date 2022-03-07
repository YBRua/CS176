import { MapGrid, CellType, Shape } from "./mapGeneration";
import { BONUS_ICON, PLAYER_ICON } from "./svgs";

export function initMapRendering(map: MapGrid, size: Shape): MapGrid {
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

  return map;
}

export function drawPlayer(row: number, col: number, map: MapGrid) {
  map[row][col].div!.innerHTML = PLAYER_ICON;
}
