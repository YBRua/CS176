// gameplay variables
let time: number = 20;
let timeElement = document.getElementById("countdown-var")!;

export function resetTimer(t: number) {
    time = t;
    timeElement.innerText = time.toString();
}

export function decreTime() {
  time -= 1;
  timeElement.innerText = time.toString();
}
