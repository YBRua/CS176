import { Title } from "../components/Title";
import { LargeButton } from "../components/LargeButton";

import "../common.scss";
import { getViewClassName, Views } from "./view";

type TitleViewPropTypes = {
  currentView: Views;
  onLargeButtonClick: () => void;
  loading: boolean;
};

export function TitleView(props: TitleViewPropTypes) {
  const currentView = props.currentView;
  const viewClassName = getViewClassName(currentView);

  if (props.loading) {
    return (
      <div className={viewClassName + " flex-center flex-col"}>
        <div className="lds-dual-ring"></div>
        <div className="font-fallback">Loading...</div>
      </div>
    );
  }

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
