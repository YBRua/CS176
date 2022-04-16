export enum OreoType {
  O,
  Re,
  Empty,
}

export enum OreoActionType {
  AppendO,
  AppendRe,
  AppendEmpty,
  RemoveLast,
}

export interface OreoAction {
  type: OreoActionType;
}
