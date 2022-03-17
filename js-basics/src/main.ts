import { SIZE, INITIAL_TIME } from "./common";
import { resetTimer } from "./gameplay/countdown";
import { keydownEvtHandler, setPlayerPos } from "./gameplay/movement";
import { setScore, setScoreModifier } from "./gameplay/scoreboard";
import { genMap } from "./mapGeneration";
import { drawPlayer, initMapRendering } from "./mapRender";

const endgameModal = document.getElementById("endgame-modal-container")!;
const helpModal = document.getElementById("help-modal-container")!;
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

function showHelpModal() {
  helpModal.classList.remove("hidden");
}

export function showEndgameModal() {
  endgameModal.classList.remove("hidden");
}

function hideHelpModal() {
  helpModal.classList.add("hidden");
}

export function hideEndgameModal() {
  endgameModal.classList.add("hidden");
}

function endgameBtnOnClickHandler() {
  hideEndgameModal();
  refreshGame();
}

export function refreshGame() {
  // generate and render a new map
  const map = genMap(SIZE);
  initMapRendering(map, SIZE);

  // reset things
  setPlayerPos(0, 0);
  drawPlayer(0, 0);
  setScore(0);
  setScoreModifier(1);
  resetTimer(INITIAL_TIME);

  document.getElementById("btn-start-game")!.innerText = "Restart Game";

  unfreezeGame();
}

document.getElementById("btn-start-game")!.onclick = refreshGame;
document.addEventListener("keydown", keydownEvtHandler);
document.getElementById("endgame-btn")!.onclick = endgameBtnOnClickHandler;
document.getElementById("btn-show-help")!.onclick = showHelpModal;
document.getElementById("btn-hide-help")!.onclick = hideHelpModal;
