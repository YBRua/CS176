import { refreshGame } from "../main";

// gameplay variables
let timeRemain: number = 20;
let timeElement = document.getElementById("countdown-var")!;
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
  timeRemain -= 1;
  timeElement.innerText = timeRemain.toString();
  if (timeRemain == 0) {
    alert("Time's up!");
    refreshGame();
  }
}

export function getRemainingTime(): number {
  return timeRemain;
}
