import React, { useMemo } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { VegaLite } from "react-vega";
import { last } from "lodash";
import { generateSimData } from "../model";

export default function Chart({ rt, getRtColor, initialDailyInfections }) {
  const breakpoint = useWindowWidthBreakpoints();

  const infectionSpreadSim = useMemo(
    () => generateSimData(rt, initialDailyInfections),
    [rt, initialDailyInfections]
  );
  const yDomainMax = useMemo(
    () => last(generateSimData(1.1, initialDailyInfections)).newInfections,
    [initialDailyInfections]
  );

  const vegaSpec = {
    width: "container",
    height: "container",
    autosize: { contains: "padding" },
    background: "transparent",
    data: { name: "spread" },
    layer: [
      {
        mark: { type: "line", clip: true },
        encoding: {
          x: {
            field: "date",
            type: "temporal",
            title: null,
            axis: {
              tickCount: "month",
              labelFontSize: 14,
              labelAngle: breakpoint.xs ? -30 : 0,
              labelOverlap: false,
            },
          },
          y: {
            field: "newInfections",
            type: "quantitative",
            title: breakpoint.xs ? null : "Daily New Infections",
            axis: {
              titleFontSize: breakpoint.xs ? 16 : 20,
              titleFontWeight: 400,
              labelFontSize: 14,
            },
            scale: { domainMax: yDomainMax },
          },
          color: { value: getRtColor(rt) },
        },
      },
    ],
  };
  const infectionSpreadSimData = {
    spread: infectionSpreadSim,
  };

  return (
    <VegaLite spec={vegaSpec} data={infectionSpreadSimData} actions={false} />
  );
}
