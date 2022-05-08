import { useState } from "react";
import { WeaponDetailModal } from "../components/WeaponDetailModal";
import { WeaponItem } from "../components/WeaponItem";
import { loadWeapons } from "../data/weapon/weapon";

import "../styles/main.css";

type WeaponViewPropTypes = {
  setWeaponId: (id: number) => void;
};

export function WeaponView(props: WeaponViewPropTypes) {
  const { setWeaponId } = props;
  const weapons = loadWeapons();
  const [openedModalId, setOpenedModalId] = useState(-1);
  return (
    <div className="w-11/12 py-2">
      <ul className="flex flex-col gap-2">
        {weapons.map((weapon) => (
          <li key={weapon.id}>
            <WeaponItem
              weapon={weapon}
              onSelectClick={() => {
                setWeaponId(weapon.id);
              }}
              onDetailClick={() => {
                setOpenedModalId(weapon.id);
              }}
            ></WeaponItem>
            <WeaponDetailModal
              weapon={weapon}
              isOpen={weapon.id === openedModalId}
              onClose={() => {
                setOpenedModalId(-1);
              }}
            ></WeaponDetailModal>
          </li>
        ))}
      </ul>
    </div>
  );
}
