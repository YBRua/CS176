import { HoverGlowLink } from "./HoverGlowLink";

export function IndexButtonLists() {
  return (
    <div className="flex items-center flex-col gap-4">
      <HoverGlowLink to="hangar" btnText="HANGAR"></HoverGlowLink>
      <HoverGlowLink to="levels" btnText="LEVELS"></HoverGlowLink>
    </div>
  );
}
