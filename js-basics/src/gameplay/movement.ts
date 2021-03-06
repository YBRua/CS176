import { SIZE } from "../common";
import { isFrozen, isGameFrozen } from "../main";
import { CellType } from "../mapGeneration";
import { getCurrentMap, redrawPlayer } from "../mapRender";
import { increTime } from "./countdown";
import { setScoreModifier, updateScore } from "./scoreboard";

// player position
let pRow: number = 0;
let pCol: number = 0;

function clearCell(row: number, col: number) {
  const map = getCurrentMap();
  map[row][col].type = CellType.normal;
  map[row][col].value = 0;
}

function checkCellEvent() {
  const map = getCurrentMap();
  if (!map) {
    return;
  }
  const cell = map[pRow][pCol];
  switch (cell.type) {
    case CellType.bonus:
    case CellType.bomb:
      updateScore(cell.value);
      break;
    case CellType.time:
      increTime(cell.value);
      break;
    case CellType.buff:
      setScoreModifier(cell.value);
      break;
  }
  clearCell(pRow, pCol);
}

function updatePlayerPos(rowOffset: number, colOffset: number) {
  if (isGameFrozen()) {
    return;
  }
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

  checkCellEvent();
}

export function getPlayerPosition() {
  return [pRow, pCol];
}

export function setPlayerPos(row: number = 0, col: number = 0) {
  pRow = row;
  pCol = col;
}
