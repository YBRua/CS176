import "../styles/main.css";
import "../styles/LevelItem.css";
import { difficultyToString, Level } from "../data/level/level";
import { HoverGlowButton } from "./HoverGlowButton";

type LevelItemPropTypes = {
  level: Level;
  onStartGame: () => void;
};

export function LevelItem(props: LevelItemPropTypes) {
  const { level, onStartGame } = props;
  return (
    <div className="level-item rounded-item-outer">
      <div className="rounded-item-inner ">
        <div className="w-1/3">
          <div className="text-zinc-400">Mission {level.id}</div>
          <div className="text-zinc-200">{level.name}</div>
        </div>
        <div className="w-1/3">
          <div className="text-zinc-400">Difficulty</div>
          <div className="text-zinc-200">
            {difficultyToString(level.difficulty)}
          </div>
        </div>
        <HoverGlowButton
          btnText="Go!"
          extraClassNames="text-xl w-1/3"
          onClick={() => {
            onStartGame();
          }}
        ></HoverGlowButton>
      </div>
    </div>
  );
}
