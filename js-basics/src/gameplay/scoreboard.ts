const scoreboard = document.getElementById("score-var")!;
let score: number = 0;
let modifier: number = 1;

export function setScoreModifier(m: number) {
  modifier = m;
}

export function updateScore(delta: number) {
  if (delta > 0) {
    delta *= modifier;
  }
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

export function getScore() {
  return score;
}

export function displayScore() {
  const score = getScore();
  const scoreDisplay = document.getElementById("score-display")!;
  scoreDisplay.innerText = score.toString();
}
