import { MapGrid, Shape } from "./mapGeneration";

export function renderMap(map: MapGrid, size: Shape) {
  const container = document.getElementById("checkboard-container")!;
  container.innerHTML = "";

  for (let i = 0; i < size.height; ++i) {
    let row = document.createElement("div");
    row.classList.add("checkboard-row");

    for (let j = 0; j < size.width; ++j) {
      let cell = document.createElement("div");
      cell.classList.add("checkboard-cell");
      row.appendChild(cell);
    }

    container.appendChild(row);
  }
}
