import { HoverGlowButton } from "./HoverGlowButton";
import { Weapon } from "../data/weapon/weapon";

import "../styles/WeaponItem.css";
import "../styles/main.css";

type WeaponItemPropTypes = {
  weapon: Weapon;
  onSelectClick: () => void;
};

export function WeaponItem(props: WeaponItemPropTypes) {
  const { weapon, onSelectClick } = props;
  return (
    <div className="weapon-item rounded-item-outer">
      <div className="rounded-item-inner">
        <div className="w-1/4">
          <div className="text-zinc-400">Name</div>
          <div className="text-zinc-200">{weapon.name}</div>
        </div>
        <div className="w-1/4">
          <div className="text-zinc-400">Damage</div>
          <div className="text-zinc-200">{weapon.damage}</div>
        </div>
        <div className="w-1/4">
          <div className="text-zinc-400">CoolDown</div>
          <div className="text-zinc-200">{weapon.cooldown}</div>
        </div>
        <HoverGlowButton
          btnText="SELECT"
          onClick={() => {
            onSelectClick();
          }}
        ></HoverGlowButton>
        <HoverGlowButton btnText="DETAIL"></HoverGlowButton>
      </div>
    </div>
  );
}
