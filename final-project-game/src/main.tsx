import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/shop" element={<h1>Shop</h1>}></Route>
        </Route>
        <Route path="*" element={<h1>Not Found 捏</h1>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
