import { INITIAL_TIME } from "../common";
import {
  freezeGame,
  isGameFrozen,
  showEndgameModal,
} from "../main";
import { displayScore } from "./scoreboard";

// gameplay variables
let timeRemain: number = INITIAL_TIME;

const timeElement = document.getElementById("countdown-var")!;
let timerDescriptor: number = -1;

export function resetTimer(t: number) {
  if (timerDescriptor >= 0) {
    clearInterval(timerDescriptor);
  }

  timeRemain = t;
  timeElement.innerText = timeRemain.toString();
  timerDescriptor = setInterval(decreTime, 1000);
}

export function decreTime() {
  if (!isGameFrozen()) {
    timeRemain -= 1;
    timeElement.innerText = timeRemain.toString();
    if (timeRemain == 0) {
      endGame();
    }
  }
}

export function getRemainingTime(): number {
  return timeRemain;
}

function endGame() {
  displayScore();
  showEndgameModal();
  freezeGame();
}
