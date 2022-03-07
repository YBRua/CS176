import { genMap, MapGrid, Shape } from "./mapGeneration";
import { drawPlayer, initMapRendering } from "./mapRender";
import { PLAYER_ICON } from "./svgs";

// initial player position
let pRow: number = 0;
let pCol: number = 0;

// initial map config
let divGrid: MapGrid;
const size: Shape = { height: 10, width: 10 };
const numBonus = 10;
const score = 10;

function refreshGame() {
  pRow = 0;
  pCol = 0;
  const map = genMap(size, numBonus, score);
  divGrid = initMapRendering(map, size);

  document.getElementById("btn-start-game")!.innerText = "Restart Game";

  drawPlayer(0, 0, divGrid);
}

function updatePlayer(rowOffset: number, colOffset: number, map: MapGrid) {
  let newRow: number;
  let newCol: number;
  if (pRow + rowOffset < 0 || pRow + rowOffset >= size.height) {
    newRow = pRow;
  } else {
    newRow = pRow + rowOffset;
  }
  if (pCol + colOffset < 0 || pCol + colOffset >= size.width) {
    newCol = pCol;
  } else {
    newCol = pCol + colOffset;
  }

  map[pRow][pCol].div!.innerHTML = "";
  map[newRow][newCol].div!.innerHTML = PLAYER_ICON;

  pRow = newRow;
  pCol = newCol;
}

function keydownEvtHandler(evt: KeyboardEvent) {
  switch (evt.code) {
    case "ArrowUp":
      updatePlayer(-1, 0, divGrid);
      break;
    case "ArrowDown":
      updatePlayer(1, 0, divGrid);
      break;
    case "ArrowLeft":
      updatePlayer(0, -1, divGrid);
      break;
    case "ArrowRight":
      updatePlayer(0, 1, divGrid);
      break;
  }
}

document.getElementById("btn-start-game")!.onclick = refreshGame;
document.addEventListener("keydown", keydownEvtHandler);
