import React, { useState } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { round } from "lodash";
import Navbar from "./components/Navbar";
import Headings from "./components/Headings";
import Introduction from "./components/Introduction";
import InteractiveChart from "./components/InteractiveChart";
import { generateSimData } from "./model";

export default function App() {
  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  const [initialDailyInfections, setInitialDailyInfections] = useState(9000);
  const [usDailyAverage, setUsDailyAverage] = useState(9000);

  let infectionSpreadSims = {};
  for (let rt = 0; rt <= 3; rt = round(rt + 0.01, 2)) {
    infectionSpreadSims[rt] = generateSimData(rt, initialDailyInfections);
  }

  return (
    <>
      <Navbar />

      <main>
        <Headings />

        {!chartFirst && (
          <Introduction
            {...{ initialDailyInfections, usDailyAverage, chartFirst }}
          />
        )}

        <InteractiveChart
          {...{
            initialDailyInfections,
            setInitialDailyInfections,
            infectionSpreadSims,
          }}
        />

        {chartFirst && (
          <Introduction
            {...{ initialDailyInfections, usDailyAverage, chartFirst }}
          />
        )}
      </main>
    </>
  );
}
