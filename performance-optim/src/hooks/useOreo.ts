import { OreoAction, OreoType, OreoActionType } from "../oreo";
import { useReducer, useCallback as useMemo } from "react";

function oreoLogicToTextMapper(oreo: OreoType[]) {
  return oreo.map((oreoType) => {
    switch (oreoType) {
      case OreoType.O:
        return "O";
      case OreoType.Re:
        return "RE";
      case OreoType.Empty:
        return " & ";
    }
  });
}

export function useOreo(initialState: OreoType[] = []) {
  function oreoReducer(state: OreoType[], action: OreoAction) {
    switch (action.type) {
      case OreoActionType.AppendO:
        return [...state, OreoType.O];
      case OreoActionType.AppendRe:
        return [...state, OreoType.Re];
      case OreoActionType.AppendEmpty:
        return [...state, OreoType.Empty];
      case OreoActionType.RemoveLast:
        return state.slice(0, -1);
    }
  }

  const [oreo, updateOreo] = useReducer(oreoReducer, initialState);
  const oreoText = useMemo(
    () => oreoLogicToTextMapper(oreo).join(""),
    [oreo]
  );

  return [oreo, oreoText, updateOreo];
}
