import { SIZE } from "../common";
import { redrawPlayer } from "../mapRender";

// initial player position
let pRow: number = 0;
let pCol: number = 0;

function updatePlayerPos(rowOffset: number, colOffset: number) {
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

  redrawPlayer(newRow, newCol);

  pRow = newRow;
  pCol = newCol;
}

export function keydownEvtHandler(evt: KeyboardEvent) {
  switch (evt.code) {
    case "ArrowUp":
      updatePlayerPos(-1, 0);
      break;
    case "ArrowDown":
      updatePlayerPos(1, 0);
      break;
    case "ArrowLeft":
      updatePlayerPos(0, -1);
      break;
    case "ArrowRight":
      updatePlayerPos(0, 1);
      break;
  }
}

export function getPlayerPosition() {
  return [pRow, pCol];
}
