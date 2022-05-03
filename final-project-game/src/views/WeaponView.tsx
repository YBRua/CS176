import { WeaponItem } from "../components/WeaponItem";
import { loadWeapons } from "../data/weapon/weapon";

import "../styles/main.css";

type WeaponViewPropTypes = {
  setWeaponId: (id: number) => void;
};

export function WeaponView(props: WeaponViewPropTypes) {
  const { setWeaponId } = props;
  const weapons = loadWeapons();
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
            ></WeaponItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
