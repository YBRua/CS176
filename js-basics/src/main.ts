import { decreTime, resetTimer } from "./gameplay/countdown";
import { genMap, MapGrid, Shape } from "./mapGeneration";
import { drawPlayer, initMapRendering } from "./mapRender";

// initial player position
let pRow: number = 0;
let pCol: number = 0;

// initial map config
let divGrid: MapGrid;
const SIZE: Shape = { height: 10, width: 10 };
const NUM_BONUS = 10;
const SCORE_PER_CELL = 10;
const INITIAL_TIME = 20;

function refreshGame() {
  pRow = 0;
  pCol = 0;
  const map = genMap(SIZE, NUM_BONUS, SCORE_PER_CELL);
  divGrid = initMapRendering(map, SIZE);

  document.getElementById("btn-start-game")!.innerText = "Restart Game";

  drawPlayer(0, 0, divGrid);

  resetTimer(INITIAL_TIME);
  setInterval(decreTime, 1000);
}

function updatePlayer(rowOffset: number, colOffset: number, map: MapGrid) {
  let newRow: number;
  let newCol: number;
  if (pRow + rowOffset < 0 || pRow + rowOffset >= SIZE.height) {
    newRow = pRow;
  } else {
    newRow = pRow + rowOffset;
  }
  if (pCol + colOffset < 0 || pCol + colOffset >= SIZE.width) {
    newCol = pCol;
  } else {
    newCol = pCol + colOffset;
  }

  map[pRow][pCol].div!.innerHTML = "";
  drawPlayer(newRow, newCol, map);

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
