import { useEffect, useState } from "react";
import { getAircraftById } from "../data/aircraft/aircraft";
import { getLevelById } from "../data/level/level";
import { GameManager } from "../gaming/gameManager";
import { PlayerConfig } from "../hooks/usePlayerConfig";
import { PauseModal } from "../components/PauseModal";

import "../styles/GameView.css";
import { EndModal } from "../components/EndModal";

type GameViewPropTypes = {
  levelId: number;
  canvas: JSX.Element;
  gameManager: GameManager;
  playerConfig: PlayerConfig;
  setPlayerHP: (hp: number) => void;

  score: number;
  setScore: (score: number) => void;
};

export function GameView(props: GameViewPropTypes) {
  const {
    levelId,
    canvas,
    gameManager,
    playerConfig,
    setPlayerHP,
    score,
    setScore,
  } = props;
  let gameViewMain: JSX.Element;

  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

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
    gameManager.setScoreState = setScore;
    gameManager.setPlayerHPState = setPlayerHP;
    gameManager.toggleEndState = setIsEnded;
    gameManager.togglePauseState = setIsPaused;

    gameManager.init(levelId);
    gameManager.run();
  });

  return (
    <div className="game-view-container">
      <PauseModal isPaused={isPaused} gameManager={gameManager}></PauseModal>
      <EndModal
        isEnded={isEnded}
        gameManager={gameManager}
        score={score}
      ></EndModal>

      <h2 className="game-view-title">Level {levelId}</h2>
      {gameViewMain}
    </div>
  );
}
