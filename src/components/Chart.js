import React, { useMemo } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { VegaLite } from "react-vega";
import { last, round } from "lodash";
import { generateSimData } from "../model";

export default function Chart({
  rt,
  rtLower80,
  rtUpper80,
  getRtColor,
  initialDailyInfections,
}) {
  const windowBp = useWindowWidthBreakpoints();

  const yDomainMax = useMemo(
    () =>
      last(generateSimData(1.1, initialDailyInfections)).medianNewInfections,
    [initialDailyInfections]
  );

  // Vega-Lite requires a separate layer for each gradient color of the
  // confidence interval area, and I'll be using the same color scale inside the
  // confidence interval as I do with individual lines.
  let ciBreakpoints = [];
  if (rtLower80 && rtUpper80) {
    ciBreakpoints.push(rtLower80);
    for (let r = 0.9; r <= 1.1; r = round(r + 0.01, 2)) {
      if (rtLower80 < r && r < rtUpper80) {
        ciBreakpoints.push(r);
      }
    }
    ciBreakpoints.push(rtUpper80);
  }

  const infectionSpreadSim = generateSimData(
    rt,
    initialDailyInfections,
    ciBreakpoints
  );

  let ciLayers = [];
  for (let i = 1; i < ciBreakpoints.length; i++) {
    ciLayers.push({
      mark: { type: "area", clip: true },
      encoding: {
        y: { field: `ciBreakpoint${i - 1}`, type: "quantitative" },
        y2: { field: `ciBreakpoint${i}`, type: "quantitative" },
        color: {
          value: getRtColor((ciBreakpoints[i - 1] + ciBreakpoints[i]) / 2),
        },
        opacity: { value: 0.1 },
      },
    });
  }

  const vegaSpec = {
    width: "container",
    height: "container",
    autosize: { contains: "padding" },
    background: "transparent",
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        title: null,
        axis: {
          tickCount: "month",
          labelFontSize: 14,
          labelAngle: windowBp.xs ? -30 : 0,
          labelOverlap: false,
        },
      },
    },
    layer: [
      {
        mark: { type: "line", clip: true },
        encoding: {
          y: {
            field: "medianNewInfections",
            type: "quantitative",
            title: windowBp.xs ? null : "Daily New Infections",
            axis: {
              titleFontSize: windowBp.xs ? 16 : 20,
              titleFontWeight: 400,
              labelFontSize: 14,
            },
            scale: { domainMax: yDomainMax },
          },
          color: { value: getRtColor(rt) },
        },
      },
      ...ciLayers,
    ],
    data: { name: "spread" },
  };
  const infectionSpreadSimData = { spread: infectionSpreadSim };

  return (
    <VegaLite spec={vegaSpec} data={infectionSpreadSimData} actions={false} />
  );
}
