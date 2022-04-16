import { Title } from "../components/Title";
import { LargeButton } from "../components/LargeButton";

import "../common.scss";
import { getViewClassName, Views } from "./view";

type TitleViewPropTypes = {
  currentView: Views;
  onLargeButtonClick: () => void;
};

export function TitleView(props: TitleViewPropTypes) {
  const currentView = props.currentView;
  const viewClassName = getViewClassName(currentView);
  return (
    <div className={viewClassName}>
      <Title></Title>
      <div className="title-button-container">
        <LargeButton
          text="Click to Start"
          hoverText="GO!"
          onClick={props.onLargeButtonClick}
        ></LargeButton>
      </div>
    </div>
  );
}
