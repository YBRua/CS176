import "../styles/main.css";
import "../styles/TitleView.css";

export function TitleView() {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <h1 className="main-title text-3xl font-bold font-serif font-smallcaps text-center p-4">
        Another Game that Somehow Renders
      </h1>
      <h2 className="text-xl font-smallcaps font-serif text-zinc-300 p-2">
        CS176 Final Project
      </h2>
    </div>
  );
}
