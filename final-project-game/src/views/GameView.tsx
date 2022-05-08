import { useEffect, useState } from "react";
import { getAircraftById } from "../data/aircraft/aircraft";
import { getLevelById } from "../data/level/level";
import { GameManager } from "../gaming/gameManager";
import { PlayerConfig } from "../hooks/usePlayerConfig";
import { PauseModal } from "../components/PauseModal";

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

  const [isPaused, setIsPaused] = useState(false);

  const levelConfig = getLevelById(levelId);
  if (!levelConfig) {
    gameViewMain = <h1>The game is not initialized.</h1>;
  } else {
    gameViewMain = canvas;
  }

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  useEffect(() => {
    console.log("Called");
    gameManager.setPlayerConfig(playerConfig);
    gameManager.setPlayerHP = setPlayerHP;
    gameManager.togglePauseState = setIsPaused;

    gameManager.init(levelId);
    gameManager.run();
  });

  return (
    <div className="game-view-container">
      <PauseModal isPaused={isPaused} gameManager={gameManager}></PauseModal>

      <h2 className="game-view-title">Level {levelId}</h2>
      {gameViewMain}
    </div>
  );
}
