import { SIZE, NUM_BONUS, SCORE_PER_CELL, INITIAL_TIME } from "./common";
import { resetTimer } from "./gameplay/countdown";
import { keydownEvtHandler, setPlayerPos } from "./gameplay/movement";
import { setScore } from "./gameplay/scoreboard";
import { genMap } from "./mapGeneration";
import { drawPlayer, initMapRendering } from "./mapRender";

const endgameModal = document.getElementById("modal-endgame")!;
const modalBG = document.getElementById("modal-container")!;
export let isFrozen: boolean = false;

export function isGameFrozen() {
  return isFrozen;
}

export function freezeGame() {
  isFrozen = true;
}

export function unfreezeGame() {
  isFrozen = false;
}

export function showEndgameModal() {
  modalBG.classList.remove("hidden");
  endgameModal.classList.remove("hidden");
}

export function hideEndgameModal() {
  modalBG.classList.add("hidden");
  endgameModal.classList.add("hidden");
}

function endgameBtnOnClickHandler() {
  hideEndgameModal();
  refreshGame();
}

export function refreshGame() {
  // generate and render a new map
  const map = genMap(SIZE, NUM_BONUS, SCORE_PER_CELL);
  initMapRendering(map, SIZE);

  // reset things
  setPlayerPos(0, 0);
  drawPlayer(0, 0);
  setScore(0);
  resetTimer(INITIAL_TIME);

  document.getElementById("btn-start-game")!.innerText = "Restart Game";

  unfreezeGame();
}

document.getElementById("btn-start-game")!.onclick = refreshGame;
document.addEventListener("keydown", keydownEvtHandler);
document.getElementById("endgame-btn")!.onclick = endgameBtnOnClickHandler;
