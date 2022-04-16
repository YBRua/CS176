export enum Views {
  Home,
  Editor,
  Canvas,
}

export function getViewClassName(view: Views) {
  if (view === Views.Home) {
    return "full-height-container";
  }
  if (view === Views.Editor) {
    return "full-height-container translate-up";
  }
  if (view === Views.Canvas) {
    // return "extensible-full-height-container translate-2up";
    return "extensible-full-height-container";
  }
}

export function getAppClassName(view: Views) {
  if (view === Views.Home || view === Views.Editor) {
    return "app-height-fixed";
  } else {
    return "app-height-extensible";
  }
}
