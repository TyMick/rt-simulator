import React, { useState, useEffect } from "react";
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

  const initialDomainMax = generateSimData(1.1, initialDailyInfections).pop()
    .newInfections;
  const [rt, setRt] = useState(1.1);

  const [animating, setAnimating] = useState(true);
  const [animationDirection, setAnimationDirection] = useState("down");
  const [timeAtEnds, timeWhileMoving] = [3000, 50];
  useEffect(() => {
    if (animating) {
      let timer;
      if (rt === 0.9) {
        timer = setTimeout(() => {
          setAnimationDirection("up");
          setRt(0.91);
        }, timeAtEnds);
      } else if (rt === 1.1) {
        timer = setTimeout(() => {
          setAnimationDirection("down");
          setRt(1.09);
        }, timeAtEnds);
      } else {
        const nextRt =
          Math.round(
            (animationDirection === "up" ? rt + 0.01 : rt - 0.01) * 100
          ) / 100; // Float troubles
        timer = setTimeout(() => {
          setRt(nextRt);
        }, timeWhileMoving);
      }
      return () => {
        clearTimeout(timer);
      };
    }
  }, [rt, animating, animationDirection]);

  const successColor = "#28a745";
  const warningColor = "#ffc107";
  const dangerColor = "#dc3545";
  const rtColorScale = chroma
    .scale([successColor, warningColor, dangerColor])
    .domain([0.95, 1.05]);

  const vegaSpec = {
    width: "container",
    height: "container",
    autosize: { contains: "padding" },
    background: "transparent",
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
          labelAngle: bp.xs ? -30 : 0,
          labelOverlap: false,
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
        scale: { domainMax: rt > 1.1 ? null : initialDomainMax },
      },
      color: { value: rtColorScale(rt).hex() },
    },
  };
  const infectionSpreadSim = {
    spread: generateSimData(rt, initialDailyInfections),
  };

  return (
    <Container as="figure" fluid="xl" className="cap-width-lg">
      <figcaption
        className={clsx("text-center mb-n2", bp.xs ? "h5" : "h4")}
        style={{ zIndex: 10000000000 }}
      >
        {bp.xs && <div className="h5 mb-0">Daily new infections when</div>}
        <TeX
          math={`R_t = ${rt}${rt.toString().length === 1 ? ".0" : ""}`}
          style={{ color: rtColorScale(rt).hex() }}
        />
        {/* Add an invisible 0 for spacing on multiples of 0.1 */}
        {rt.toString().length !== 4 && <TeX math="0" className="invisible" />}
      </figcaption>
      <VegaLite spec={vegaSpec} data={infectionSpreadSim} actions={false} />

      {/* Inputs */}
    </Container>
  );
}
