import { SIZE, NUM_BONUS, SCORE_PER_CELL, INITIAL_TIME } from "./common";
import { decreTime, resetTimer } from "./gameplay/countdown";
import { keydownEvtHandler } from "./gameplay/movement";
import { genMap } from "./mapGeneration";
import { drawPlayer, initMapRendering } from "./mapRender";

function refreshGame() {
  // generate and render a new map
  const map = genMap(SIZE, NUM_BONUS, SCORE_PER_CELL);
  initMapRendering(map, SIZE);
  drawPlayer(0, 0);

  // start timer
  resetTimer(INITIAL_TIME);
  setInterval(decreTime, 1000);

  document.getElementById("btn-start-game")!.innerText = "Restart Game";
}

document.getElementById("btn-start-game")!.onclick = refreshGame;
document.addEventListener("keydown", keydownEvtHandler);
