import ReactModal from "react-modal";
import { Styles } from "react-modal";
import { HoverGlowButton } from "./HoverGlowButton";

import "../styles/Modals.css";
import { Weapon } from "../data/weapon/weapon";

type WeaponDetailPropTypes = {
  isOpen: boolean;
  onClose: () => void;
  weapon: Weapon;
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

export function WeaponDetailModal(props: WeaponDetailPropTypes) {
  const { isOpen, onClose, weapon } = props;
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <h2 className="text-center text-4xl my-4 text-white underline">
        {weapon.name}
      </h2>
      <div className="flex gap-8 justify-evenly my-12">
        <div className="flex flex-col items-center">
          <div className="pt-4">Damage: {weapon.damage}</div>
          <div className="pt-2">CoolDown: {weapon.longCD}</div>
          <div className="pt-2">MaxShots: {weapon.maxShots}</div>
        </div>
        <div className="max-w-sm">{weapon.description}</div>
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
