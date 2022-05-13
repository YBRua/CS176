import { HoverGlowLink } from "../components/HoverGlowLink";

export function HelpView() {
  return (
    <div className="flex items-center flex-col">
      <h3 className="py-8 w-11/12 text-center">Help</h3>
      <div className="flex flex-row w-11/12 items-center justify-center py-1 border-y-2 border-zinc-100">
        <HoverGlowLink
          to="/"
          btnText="Back"
          extraClassName="text-xl"
        ></HoverGlowLink>
      </div>
      <div className="text-sm py-4 w-10/12">
        <ul className="flex flex-col gap-4 scrollbar-hidden max-h-list overflow-y-scroll">
          <li className="underline font-bold">CREDITS</li>
          <li>
            Free BGM and SFX from{" "}
            <a className=" underline" href="https://wingless-seraph.net/">
              Wingless Seraph
            </a>
            ,{" "}
            <a className="underline" href="https://mixkit.co/">
              Mixkit
            </a>{" "}
            and{" "}
            <a className="underline" href="https://www.fesliyanstudios.com">
              Fesliyanstudios
            </a>
            .
          </li>
          <li className="underline font-bold">HELP</li>
          <li>
            &gt; Use "A" (or LeftArrow) and "D" (or RightArrow) to move your
            aircraft
          </li>
          <li>&gt; Use "SPACE" to fire your weapon</li>
          <li>&gt; Use "ESC" during game to pause the game</li>
          <li></li>
          <li>&gt; You can change your aircraft in HANGAR-AIRCRAFT</li>
          <li>&gt; You can change your weapon in HANGAR-WEAPON</li>
          <li></li>
          <li>&gt; You can start a new game in LEVELS</li>
          <li>&gt; Destroy enemy aircraft to get high scores</li>
          <li>
            &gt; This game does not have an end. Try to survive as long as
            possible
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
