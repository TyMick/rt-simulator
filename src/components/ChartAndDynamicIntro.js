import React, { useReducer } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { initialState, reducer, DispatchContext } from "../reducer";
import useAnimation from "../hooks/useAnimation";
import useCovidData from "../hooks/useCovidData";
import Introduction from "./Introduction";
import InteractiveChart from "./InteractiveChart";

export default function ChartAndDynamicIntro() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useAnimation(state.animating, state.rt, dispatch);

  useCovidData(dispatch);

  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  return (
    <DispatchContext.Provider value={dispatch}>
      {!chartFirst && (
        <Introduction
          initialDailyInfections={state.initialDailyInfections}
          chartFirst={chartFirst}
        />
      )}

      <InteractiveChart
        rt={state.rt}
        rtLower80={state.rtLower80}
        rtUpper80={state.rtUpper80}
        initialDailyInfections={state.initialDailyInfections}
        animating={state.animating}
        region={state.region}
      />

      {chartFirst && (
        <Introduction
          initialDailyInfections={state.initialDailyInfections}
          chartFirst={chartFirst}
        />
      )}
    </DispatchContext.Provider>
  );
}
