import React, { useState } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Container } from "react-bootstrap";
import { VegaLite } from "react-vega";
import FloatingLabel from "./FloatingLabel";
import { generateSimData } from "../model";
import "./InteractiveChart.scss";

export default function InteractiveChart({
  initialDailyInfections,
  setInitialDailyInfections,
}) {
  const breakpoint = useWindowWidthBreakpoints();
  const [rt, setRt] = useState(1.1);
  const [timelineMonths, setTimelineMonths] = useState(4);
  const [animating, setAnimating] = useState(true);

  const vegaSpec = {
    width: "container",
    height: "container",
    autosize: { contains: "padding" },
    mark: { type: "line", clip: true },
    data: { name: "spread" },
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        title: null,
        axis: {
          tickCount: "month",
          labelFontSize: 14,
          labelAngle: breakpoint.xs
            ? Math.max(
                (-90 / 5.1 ** (1 / 3)) * (timelineMonths - 2.9) ** (1 / 3),
                -90
              )
            : -30,
        },
      },
      y: {
        field: "newInfections",
        type: "quantitative",
        title: "Daily New Infections",
        axis: {
          titleFontSize: breakpoint.xs ? 16 : 20,
          titleFontWeight: 400,
          labelFontSize: 14,
        },
      },
    },
  };
  const infectionSpreadSim = {
    spread: generateSimData(rt, initialDailyInfections, timelineMonths),
  };

  /**
   * @todo Port to Next.js
   * @todo Change floating label to a normal chart label
   */

  return (
    <Container as="figure" fluid="xl">
      <FloatingLabel>{`R_t = ${rt}`}</FloatingLabel>
      <VegaLite spec={vegaSpec} data={infectionSpreadSim} actions={false} />

      {/* Inputs */}
    </Container>
  );
}
