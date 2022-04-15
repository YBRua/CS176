import "../common.scss";

type CanvasViewPropTypes = {
  isTitlePage: boolean;
};

export function CanvasView(props: CanvasViewPropTypes) {
  const isTitlePage = props.isTitlePage;
  const viewClassName = isTitlePage
    ? "full-height-container"
    : "full-height-container translate-up placeholder";
  return <div className={viewClassName}>Placeholder</div>;
}
