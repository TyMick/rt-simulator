import React, { useState, useEffect } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { round } from "lodash";
import { generateSimData } from "./model";
import Navbar from "./components/Navbar";
import Headings from "./components/Headings";
import Introduction from "./components/Introduction";
import InteractiveChart from "./components/InteractiveChart";
import useCovidData from "./hooks/useCovidData";

export default function App() {
  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  const { usaNewCases7DayAvg } = useCovidData();
  const [initialDailyInfections, setInitialDailyInfections] = useState(8000);
  // Just so I don't suddenly fill in the current US average after the user has
  // already fiddled with the initial daily infection setting:
  const [idiHasChanged, setIdiHasChanged] = useState(false);
  useEffect(() => {
    if (usaNewCases7DayAvg && !idiHasChanged) {
      setInitialDailyInfections(usaNewCases7DayAvg);
    }
  }, [usaNewCases7DayAvg, idiHasChanged]);

  let infectionSpreadSims = {};
  for (let rt = 0; rt <= 3; rt = round(rt + 0.01, 2)) {
    console.log("calculatingcalculatingcalculating");
    infectionSpreadSims[rt] = generateSimData(rt, initialDailyInfections);
  }

  return (
    <>
      <Navbar />

      <main>
        <Headings />

        {!chartFirst && (
          <Introduction
            {...{
              initialDailyInfections,
              usDailyAvg: usaNewCases7DayAvg,
              chartFirst,
            }}
          />
        )}

        <InteractiveChart
          {...{
            initialDailyInfections,
            setInitialDailyInfections,
            setUserHasChangedIDI: setIdiHasChanged,
            infectionSpreadSims,
          }}
        />

        {chartFirst && (
          <Introduction
            {...{
              initialDailyInfections,
              usDailyAvg: usaNewCases7DayAvg,
              chartFirst,
            }}
          />
        )}
      </main>
    </>
  );
}
