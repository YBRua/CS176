import React, { useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { IndexView } from "./views/IndexView";
import { HangarView } from "./views/HangarView";
import { AircraftView } from "./views/AircraftView";

import { WeaponView } from "./views/WeaponView";
import { HangarIndex } from "./views/HangarIndex";
import { LevelSelectionView } from "./views/LevelSelectionView";
import { usePlayerConfig } from "./hooks/usePlayerConfig";
import { getAircraftById } from "./data/aircraft/aircraft";
import { MainFrame } from "./MainFrame";
import { getWeaponById } from "./data/weapon/weapon";
import { GameManager } from "./gaming/gameManager";
import { GameView } from "./views/GameView";

import "./styles/main.css";
import { PlayerController } from "./gaming/playerControl";

export function App() {
  const [playerConfig, setAircraftId, setWeaponId] = usePlayerConfig();
  const [levelId, setLevelId] = useState<number>(1);

  const aircraft = getAircraftById(playerConfig.aircraftId)!;
  const weapon = getWeaponById(playerConfig.weaponId);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManager = new GameManager(canvasRef);
  const playerController = new PlayerController(gameManager);

  const canvas = (
    <canvas
      ref={canvasRef}
      width={700}
      height={500}
      className="game-canvas"
      onKeyDown={(e) => {playerController.keyDownHandler(e);}}
      onKeyUp={(e) => {playerController.keyUpHandler(e);}}
      tabIndex={0}
    ></canvas>
  );


  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainFrame aircraft={aircraft} weapon={weapon} />}
          >
            <Route index element={<IndexView />}></Route>
            <Route path="shop" element={<h1>Shop</h1>}></Route>
            <Route path="hangar" element={<HangarView></HangarView>}>
              <Route index element={<HangarIndex></HangarIndex>}></Route>
              <Route
                path="aircraft"
                element={
                  <AircraftView setAircraftId={setAircraftId}></AircraftView>
                }
              ></Route>
              <Route
                path="weaponry"
                element={<WeaponView setWeaponId={setWeaponId}></WeaponView>}
              ></Route>
            </Route>
            <Route
              path="levels"
              element={
                <LevelSelectionView
                  setLevelId={setLevelId}
                ></LevelSelectionView>
              }
            ></Route>
            <Route
              path="gaming/:id"
              element={
                <GameView
                  levelId={levelId}
                  canvas={canvas}
                  gameManager={gameManager}
                  playerConfig={playerConfig}
                ></GameView>
              }
            ></Route>
          </Route>
          <Route
            path="*"
            element={<h1 className="text-zinc-700 text-center">?</h1>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
