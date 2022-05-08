import ReactModal from "react-modal";
import { Styles } from "react-modal";
import { useNavigate } from "react-router-dom";
import { Aircraft, resolveAircraftImagePath } from "../data/aircraft/aircraft";
import { HoverGlowButton } from "./HoverGlowButton";

import "../styles/Modals.css";

type AircraftDetailPropTypes = {
  isOpen: boolean;
  onClose: () => void;
  aircraft: Aircraft;
};

const customStyles: Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  content: {
    position: "absolute",
    left: "20%",
    right: "20%",
    top: "15%",
    bottom: "15%",
    border: "2px solid #fff",
    background: "#000",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
  },
};

ReactModal.setAppElement("#root");

export function AircraftDetailModal(props: AircraftDetailPropTypes) {
  const { isOpen, onClose, aircraft } = props;
  const imgSrc = resolveAircraftImagePath(aircraft, true);
  return (
    <ReactModal isOpen={props.isOpen} style={customStyles}>
      <h2 className="text-center text-4xl my-4 text-white underline">
        {aircraft.name} | {aircraft.nickname}
      </h2>
      <div className="flex gap-8 justify-evenly my-12">
        <div className="flex flex-col items-center">
          <img
            src={imgSrc}
            alt={aircraft.name}
            width={150}
            height={150}
            className="border-2 border-dotted border-zinc-500"
          />
          <div className="pt-4">Speed: {aircraft.speed}</div>
          <div className="pt-2">HP: {aircraft.hp}</div>
        </div>
        <div className="max-w-sm">{aircraft.description}</div>
      </div>
      <div className="flex justify-center">
        <HoverGlowButton
          btnText="CLOSE"
          onClick={onClose}
          extraClassNames="text-xl underline"
        ></HoverGlowButton>
      </div>
    </ReactModal>
  );
}
