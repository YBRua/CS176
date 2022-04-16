import { LazyLoadImage } from "react-lazy-load-image-component";

import "./styles/OreoButton.scss";

type OreoButtonPropTypes = {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  buttonText: string;
  onClick: () => void;
};

export function OreoButton(props: OreoButtonPropTypes) {
  return (
    <button className="oreo-button" onClick={props.onClick} type="button">
      <LazyLoadImage
        src={props.imgSrc}
        alt={props.imgAlt}
        width={props.imgWidth}
        height={props.imgHeight}
        effect="blur"
      />
      <div className="oreo-button-text">{props.buttonText}</div>
    </button>
  );
}
