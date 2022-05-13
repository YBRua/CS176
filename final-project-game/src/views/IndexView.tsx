import { IndexTitle } from "../components/IndexTitle";
import { IndexButtonLists } from "../components/IndexButtonLists";

export function IndexView() {
  return (
    <div className="h-full flex flex-col justify-center">
      <IndexTitle></IndexTitle>
      <IndexButtonLists></IndexButtonLists>
    </div>
  );
}
