import React, { useState } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Container } from "react-bootstrap";
import { VegaLite } from "react-vega";
import TeX from "@matejmazur/react-katex";
import clsx from "clsx";
import { generateSimData } from "../model";
import "./InteractiveChart.scss";

export default function InteractiveChart({
  initialDailyInfections,
  setInitialDailyInfections,
}) {
  const bp = useWindowWidthBreakpoints();
  const [rt, setRt] = useState(1.1);
  const [timelineMonths, setTimelineMonths] = useState(4);
  const [animating, setAnimating] = useState(true);

  const vegaSpec = {
    width: "container",
    height: "container",
    autosize: { contains: "padding" },
    mark: { type: "line" },
    data: { name: "spread" },
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        title: null,
        axis: {
          tickCount: "month",
          labelFontSize: 14,
          labelAngle: bp.xs ? -50 : 0,
        },
      },
      y: {
        field: "newInfections",
        type: "quantitative",
        title: bp.xs ? null : "Daily New Infections",
        axis: {
          titleFontSize: bp.xs ? 16 : 20,
          titleFontWeight: 400,
          labelFontSize: 14,
        },
      },
    },
  };
  const infectionSpreadSim = {
    spread: generateSimData(rt, initialDailyInfections, timelineMonths),
  };

  return (
    <Container as="figure" fluid="xl" className="cap-width-lg">
      <figcaption className={clsx("text-center mb-0", bp.xs ? "h5" : "h4")}>
        {bp.xs && "Daily new infections when "}
        <TeX math={`R_t = ${rt}`} block={bp.up.sm} />
      </figcaption>
      <VegaLite spec={vegaSpec} data={infectionSpreadSim} actions={false} />

      {/* Inputs */}
    </Container>
  );
}
