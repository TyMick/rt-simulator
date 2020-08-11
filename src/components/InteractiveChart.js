import React, { useState, useEffect } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
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

  const yDomainMax = generateSimData(1.1, initialDailyInfections).pop()
    .newInfections;

  const [rt, setRt] = useState(1.1);

  const [animating, setAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("down");
  const [timeAtEnds, timeWhileMoving] = [3000, 50];
  useEffect(() => {
    if (animating) {
      let timer;
      if (rt === 0.9 && animationDirection === "down") {
        timer = setTimeout(() => {
          setAnimationDirection("up");
          setRt(0.91);
        }, timeAtEnds);
      } else if (rt === 1.1 && animationDirection === "up") {
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
      return () => clearTimeout(timer);
    }
  }, [rt, animating, animationDirection, timeAtEnds, timeWhileMoving]);
  function toggleAnimation() {
    if (!animating) {
      if (rt <= 0.9) {
        setAnimationDirection("up");
      } else if (rt < 1) {
        setAnimationDirection("down");
      } else if (rt < 1.1) {
        setAnimationDirection("up");
      } else {
        setAnimationDirection("down");
      }
    }
    setAnimating(!animating);
  }

  const successColor = "#28a745";
  const warningColor = "#ffc107";
  const dangerColor = "#dc3545";
  const rtColor = (rt) =>
    chroma
      .scale([successColor, warningColor, dangerColor])
      .domain([0.95, 1.05])(rt)
      .hex();

  const vegaSpec = {
    width: "container",
    height: "container",
    autosize: { contains: "padding" },
    background: "transparent",
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
        scale: { domainMax: yDomainMax },
      },
      color: { value: rtColor(rt) },
    },
  };
  const infectionSpreadSim = {
    spread: generateSimData(rt, initialDailyInfections),
  };

  return (
    <>
      <Container as="figure" fluid="xl" className="cap-width-lg mb-0">
        <figcaption className={clsx("text-center mb-n2", bp.xs ? "h5" : "h4")}>
          {bp.xs && <div className="h5 mb-0">Daily new infections when</div>}
          <TeX
            math={`R_t = ${rt}${rt.toString().length === 1 ? ".0" : ""}`}
            style={{ color: rtColor(rt) }}
          />
          {/* Add an invisible 0 for spacing on multiples of 0.1 */}
          {rt.toString().length !== 4 && <TeX math="0" className="invisible" />}
        </figcaption>

        <VegaLite spec={vegaSpec} data={infectionSpreadSim} actions={false} />
      </Container>

      <Container className="cap-width-lg">
        <Form>
          <Form.Group
            as={Row}
            className="align-items-center"
            controlId="rtSlider"
          >
            <Form.Label column xs="auto" className="mr-n3">
              <TeX>R_t</TeX> slider
            </Form.Label>
            <Col>
              <Form.Control
                type="range"
                min="0.5"
                step="0.01"
                max="1.5"
                value={rt}
                onChange={(e) => setRt(parseFloat(e.target.value))}
              />
            </Col>
            <Col xs={12} sm="auto">
              <Button
                variant="outline-primary"
                active={animating}
                style={{ width: "10.5rem" }}
                onClick={toggleAnimation}
              >
                {animating ? "Stop" : "Resume"} animation
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
