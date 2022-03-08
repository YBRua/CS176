import { SIZE, NUM_BONUS, SCORE_PER_CELL, INITIAL_TIME } from "./common";
import { resetTimer } from "./gameplay/countdown";
import { keydownEvtHandler, setPlayerPos } from "./gameplay/movement";
import { genMap } from "./mapGeneration";
import { drawPlayer, initMapRendering } from "./mapRender";

export function refreshGame() {
  // generate and render a new map
  const map = genMap(SIZE, NUM_BONUS, SCORE_PER_CELL);
  initMapRendering(map, SIZE);
  setPlayerPos(0, 0);
  drawPlayer(0, 0);

  // start timer
  resetTimer(INITIAL_TIME);

  document.getElementById("btn-start-game")!.innerText = "Restart Game";
}

document.getElementById("btn-start-game")!.onclick = refreshGame;
document.addEventListener("keydown", keydownEvtHandler);
