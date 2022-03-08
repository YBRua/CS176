const scoreboard = document.getElementById("score-var")!;
let score: number = 0;

export function updateScore(delta: number) {
  score += delta;
  refreshScore();
}

export function setScore(s: number) {
  score = s;
  refreshScore();
}

export function refreshScore() {
  scoreboard.innerText = score.toString();
}
