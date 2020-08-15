import React, { useReducer, useEffect } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { initialState, reducer, DispatchContext } from "./reducer";
import useAnimation from "./hooks/useAnimation";
import useCovidData from "./hooks/useCovidData";
import Navbar from "./components/Navbar";
import Headings from "./components/Headings";
import Introduction from "./components/Introduction";
import InteractiveChart from "./components/InteractiveChart";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useAnimation(state.animating, state.rt, dispatch);

  const { covidDataLoaded, usaNewCases7DayAvg, stateData } = useCovidData();
  useEffect(() => {
    if (covidDataLoaded) {
      dispatch({
        type: "covidDataLoaded",
        payload: { usaNewCases7DayAvg, stateData },
      });
    }
  }, [covidDataLoaded, usaNewCases7DayAvg, stateData]);

  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Navbar />

      <main>
        <Headings />

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
      </main>
    </DispatchContext.Provider>
  );
}
