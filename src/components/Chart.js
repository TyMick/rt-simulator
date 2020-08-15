import React, { useMemo } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { VegaLite } from "react-vega";
import { last, padStart } from "lodash";
import { generateSimData } from "../model";

export default function Chart({
  rt,
  rtLower80,
  rtUpper80,
  rtColor,
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
    const lowerGap = rt - rtLower80;
    const upperGap = rtUpper80 - rt;
    const stepsPerSide = 100;
    for (let i = 0; i < stepsPerSide; i++) {
      ciBreakpoints.push(rtLower80 + (i / stepsPerSide) * lowerGap);
    }
    for (let i = 0; i <= stepsPerSide; i++) {
      ciBreakpoints.push(rt + (i / stepsPerSide) * upperGap);
    }
  }

  const infectionSpreadSim = generateSimData(
    rt,
    initialDailyInfections,
    ciBreakpoints
  );

  let ciLayers = [];
  const midpoint = ciBreakpoints.length / 2;
  for (let i = 1; i < ciBreakpoints.length; i++) {
    const getField = (index) => `ciBreakpoint${padStart(index, 3, "0")}`;

    ciLayers.push({
      mark: { type: "area", clip: true },
      encoding: {
        y: { field: getField(i - 1), type: "quantitative" },
        y2: { field: getField(i), type: "quantitative" },
        color: { value: rtColor },
        opacity: { value: (1 - Math.abs(i - midpoint) / midpoint) ** 3 },
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
          color: { value: rtColor },
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
