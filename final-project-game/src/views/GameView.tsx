import { useEffect } from "react";
import { getAircraftById } from "../data/aircraft/aircraft";
import { getLevelById } from "../data/level/level";
import { GameManager } from "../gaming/gameManager";
import { PlayerConfig } from "../hooks/usePlayerConfig";

import "../styles/GameView.css";

type GameViewPropTypes = {
  levelId: number;
  canvas: JSX.Element;
  gameManager: GameManager;
  playerConfig: PlayerConfig;
  setPlayerHP: (hp: number) => void;
};

export function GameView(props: GameViewPropTypes) {
  const { levelId, canvas, gameManager, playerConfig, setPlayerHP } = props;
  let gameViewMain: JSX.Element;

  const levelConfig = getLevelById(levelId);
  if (!levelConfig) {
    gameViewMain = <h1>The game is not initialized.</h1>;
  } else {
    gameViewMain = canvas;
  }

  useEffect(() => {
    gameManager.setPlayerConfig(playerConfig);
    gameManager.setPlayerHP = setPlayerHP;
    gameManager.init(levelId);
    gameManager.run();
  });

  return (
    <div className="game-view-container">
      <h2 className="game-view-title">Level {levelId}</h2>
      {gameViewMain}
    </div>
  );
}
