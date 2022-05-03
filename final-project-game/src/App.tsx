import React from "react";
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

export function App() {
  const [player, setAircraftId, setWeaponId] = usePlayerConfig();
  const aircraft = getAircraftById(player.aircraftId)!;
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainFrame aircraft={aircraft} />}>
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
                element={<WeaponView></WeaponView>}
              ></Route>
            </Route>
            <Route
              path="levels"
              element={<LevelSelectionView></LevelSelectionView>}
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
