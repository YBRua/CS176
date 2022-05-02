import { HoverGlowButton } from "./HoverGlowButton";
import { Weapon } from "../data/weapon/weapon";

import "../styles/WeaponItem.css";

type WeaponItemPropTypes = {
  weapon: Weapon;
};

export function WeaponItem(props: WeaponItemPropTypes) {
  const { weapon } = props;
  return (
    <div className="weapon-item flex w-full bg-zinc-700 rounded-md transition-all hover:bg-zinc-600">
      <div className="flex items-center text-sm gap-4 w-full mx-4">
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
        <HoverGlowButton btnText="SELECT"></HoverGlowButton>
        <HoverGlowButton btnText="DETAIL"></HoverGlowButton>
      </div>
    </div>
  );
}
