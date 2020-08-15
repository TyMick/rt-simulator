import React, { useMemo } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { VegaLite } from "react-vega";
import { last, round, padStart } from "lodash";
import { generateSimData } from "../model";

export default function Chart({
  rt,
  rtLower80,
  rtUpper80,
  getRtColor,
  initialDailyInfections,
}) {
  const breakpoint = useWindowWidthBreakpoints();

  const yDomainMax = useMemo(
    () =>
      last(generateSimData(1.1, initialDailyInfections)).medianNewInfections,
    [initialDailyInfections]
  );

  // Vega-Lite requires a separate layer for each gradient color of the
  // confidence interval area, and I'll be using the same color scale inside the
  // confidence interval as I do with individual lines.
  let ciColorBreakpoints = [];
  if (rtLower80 && rtUpper80) {
    ciColorBreakpoints.push(rtLower80);
    for (let rt = 0.9; rt <= 1.1; rt = round(rt + 0.01, 2)) {
      if ((rtLower80 < rt) & (rt < rtUpper80)) {
        ciColorBreakpoints.push(rt);
      }
    }
    ciColorBreakpoints.push(rtUpper80);
  }

  const infectionSpreadSim = useMemo(
    () => generateSimData(rt, initialDailyInfections, ciColorBreakpoints),
    [rt, initialDailyInfections, ciColorBreakpoints]
  );

  let ciLayers = [];
  for (let i = 1; i < ciColorBreakpoints.length; i++) {
    const [low, high] = [ciColorBreakpoints[i - 1], ciColorBreakpoints[i]];
    const getField = (rt) => `ciBreakpoint${padStart(round(rt * 100), 3, "0")}`;

    ciLayers.push({
      mark: { type: "area", clip: true },
      encoding: {
        y: { field: getField(low), type: "quantitative" },
        y2: { field: getField(high), type: "quantitative" },
        color: { value: getRtColor((low + high) / 2) },
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
          labelAngle: breakpoint.xs ? -30 : 0,
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
      ...ciLayers,
    ],
    data: { name: "spread" },
  };
  const infectionSpreadSimData = { spread: infectionSpreadSim };

  return (
    <VegaLite spec={vegaSpec} data={infectionSpreadSimData} actions={false} />
  );
}
