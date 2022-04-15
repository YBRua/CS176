import { Title } from "../components/Title";
import { LargeButton } from "../components/LargeButton";

import "../common.scss";

type TitleViewPropTypes = {
  isTitlePage: boolean;
  onLargeButtonClick: () => void;
};

export function TitleView(props: TitleViewPropTypes) {
  const isTitlePage = props.isTitlePage;
  const viewClassName = isTitlePage
    ? "full-height-container"
    : "full-height-container translate-up";
  return (
    <div className={viewClassName}>
      <Title></Title>
      <div className="title-button-container">
        <LargeButton
          text="GO!"
          onClick={props.onLargeButtonClick}
        ></LargeButton>
      </div>
    </div>
  );
}
