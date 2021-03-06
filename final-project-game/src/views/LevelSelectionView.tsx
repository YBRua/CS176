import { HoverGlowLink } from "../components/HoverGlowLink";
import { LevelItem } from "../components/LevelItem";
import { loadLevels } from "../data/level/level";
import { useNavigate, useParams } from "react-router-dom";

type LevelSelectionViewPropTypes = {
  setLevelId: (levelId: number) => void;
};

export function LevelSelectionView(props: LevelSelectionViewPropTypes) {
  const { setLevelId } = props;
  const levels = loadLevels();
  const navigate = useNavigate();

  return (
    <div className="flex items-center flex-col">
      <h3 className="py-8 w-11/12 text-center">Level Selection</h3>
      <div className="flex flex-row w-11/12 items-center justify-center py-2 border-y-2 border-zinc-100">
        <HoverGlowLink
          to="/"
          btnText="Back"
          extraClassName="text-xl"
        ></HoverGlowLink>
      </div>
      <div className="w-11/12 py-2">
        <ul className="flex flex-col gap-2">
          {levels.map((level) => (
            <li key={level.id}>
              <LevelItem
                level={level}
                onStartGame={() => {
                  setLevelId(level.id);
                  navigate(`/gaming/${level.id}`);
                }}
              ></LevelItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
