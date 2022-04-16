import "./styles/Title.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function Title() {
  return (
    <header className="title-container">
      <div className="main-title-container">
        <LazyLoadImage
          src="./src/figs/minified/oreo.png"
          alt="I'm Oreo"
          className="title-image"
        ></LazyLoadImage>
        <h1 className="main-title">Unofficial Oreo Compiler</h1>
        <LazyLoadImage
          src="./src/figs/minified/oreo.png"
          alt="I'm Oreo"
          className="title-image"
        ></LazyLoadImage>
      </div>
      <h2 className="main-subtitle">An SJTU CS176 Course Assignment</h2>
    </header>
  );
}
