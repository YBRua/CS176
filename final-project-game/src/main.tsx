import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { IndexView } from "./views/IndexView";
import { HangarView } from "./views/HangarView";
import { AircraftView } from "./views/AircraftView";

import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<IndexView />}></Route>
          <Route path="shop" element={<h1>Shop</h1>}></Route>
          <Route path="hangar" element={<HangarView></HangarView>}>
            <Route path="aircraft" element={<AircraftView></AircraftView>}></Route>
            <Route path="weaponry" element={<h2>Weapon</h2>}></Route>
          </Route>
          <Route path="levels" element={<h1>Level Selection</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
