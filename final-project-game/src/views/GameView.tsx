import { useEffect } from "react";
import { getLevelById } from "../data/level/level";
import { GameManager } from "../gaming/gameManager";

import "../styles/GameView.css";

type GameViewPropTypes = {
  levelId: number;
  canvas: JSX.Element;
  gameManager: GameManager;
};

export function GameView(props: GameViewPropTypes) {
  const { levelId, canvas, gameManager } = props;
  let gameViewMain: JSX.Element;

  const levelConfig = getLevelById(levelId);
  if (!levelConfig) {
    gameViewMain = <h1>The game is not initialized.</h1>;
  } else {
    gameViewMain = canvas;
  }

  useEffect(() => {
    gameManager.initCtx();
    gameManager.run();
  });

  return (
    <div className="game-view-container">
      <h2 className="game-view-title">Level {levelId}</h2>
      {gameViewMain}
    </div>
  );
}
