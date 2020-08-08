import React, { useState } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Container } from "react-bootstrap";
import { VegaLite } from "react-vega";
import TeX from "@matejmazur/react-katex";
import clsx from "clsx";
import chroma from "chroma-js";
import { generateSimData } from "../model";
import "./InteractiveChart.scss";

export default function InteractiveChart({
  initialDailyInfections,
  setInitialDailyInfections,
}) {
  const bp = useWindowWidthBreakpoints();
  const [rt, setRt] = useState(1.1);
  const [animating, setAnimating] = useState(true);

  const successColor = "#28a745";
  const warningColor = "#ffc107";
  const dangerColor = "#dc3545";
  const rtColorScale = chroma
    .scale([successColor, warningColor, dangerColor])
    .domain([0.95, 1.05]);
  const rtColor = (rt) =>
    rt < 0.95 ? successColor : rt > 1.05 ? dangerColor : rtColorScale(rt).hex();

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
      color: { value: rtColor(rt) },
    },
  };
  const infectionSpreadSim = {
    spread: generateSimData(rt, initialDailyInfections),
  };

  return (
    <Container as="figure" fluid="xl" className="cap-width-lg">
      <figcaption className={clsx("text-center mb-0", bp.xs ? "h5" : "h4")}>
        {bp.xs && "Daily new infections when "}
        <TeX
          math={`R_t = ${rt.toFixed(2)}`}
          block={bp.up.sm}
          style={{ color: rtColor(rt) }}
        />
      </figcaption>
      <VegaLite spec={vegaSpec} data={infectionSpreadSim} actions={false} />

      {/* Inputs */}
    </Container>
  );
}
