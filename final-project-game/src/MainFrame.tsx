import { Outlet } from "react-router-dom";
import { TitleView } from "./views/TitleView";

import "./styles/main.css";
import { AircraftDisplay } from "./components/AircraftDisplay";
import { Aircraft } from "./data/aircraft/aircraft";

type MainFramePropTypes = {
  aircraft: Aircraft;
};

export function MainFrame(props: MainFramePropTypes) {
  return (
    <h1 className="text-3xl flex h-screen">
      <div className="w-3/12 bg-midnight h-full">
        <TitleView></TitleView>
      </div>
      <div
        className="
        w-6/12 h-full 
        bg-midnight
        border-l-2 border-r-2 border-white
        shadow-white shadow-lg
        z-10"
      >
        <Outlet></Outlet>
      </div>
      <div className="w-3/12 bg-midnight h-full">
        <AircraftDisplay aircraft={props.aircraft}></AircraftDisplay>
      </div>
    </h1>
  );
}
