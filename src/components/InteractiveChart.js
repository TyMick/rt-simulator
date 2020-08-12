import React, { useState, useEffect } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Container, Form, Col, Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { VegaLite } from "react-vega";
import TeX from "@matejmazur/react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import chroma from "chroma-js";
import { last, round } from "lodash";

export default function InteractiveChart({
  initialDailyInfections,
  setInitialDailyInfections,
  infectionSpreadSims,
}) {
  const bp = useWindowWidthBreakpoints();

  const yDomainMax = last(infectionSpreadSims["1.1"]).newInfections;

  const [rt, setRt] = useState(1.1);
  const [usState, setUsState] = useState("");

  const [animating, setAnimating] = useState(true);
  const [animationDirection, setAnimationDirection] = useState("up");
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
        const nextRt = round(
          animationDirection === "up" ? rt + 0.01 : rt - 0.01,
          2
        );
        timer = setTimeout(() => {
          setRt(nextRt);
        }, timeWhileMoving);
      }
      return () => clearTimeout(timer);
    }
  }, [rt, animating, animationDirection, timeAtEnds, timeWhileMoving]);
  function toggleAnimation() {
    if (!animating) {
      setUsState("");
      if (rt < 1.1) {
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
  const infectionSpreadSim = { spread: infectionSpreadSims[rt] };

  return (
    <>
      {/* Chart */}
      <Container as="figure" fluid="xl" className="cap-width-lg mb-0">
        <figcaption className={clsx("text-center mb-n2", bp.xs ? "h5" : "h4")}>
          {bp.xs && <div className="h5 mb-0">Daily new infections when</div>}
          <TeX
            math={`R_t = ${rt}${rt.toString().length === 1 ? ".0" : ""}`}
            style={{ color: rtColor(rt) }}
          />
          {/* Adding an invisible 0 for spacing on multiples of 0.1 */}
          {rt.toString().length !== 4 && <TeX math="0" className="invisible" />}
        </figcaption>

        <VegaLite spec={vegaSpec} data={infectionSpreadSim} actions={false} />
      </Container>

      {/* Interactive elements */}
      <Container className="cap-width-lg">
        <Form>
          <Form.Group
            as={Form.Row}
            controlId="rtSlider"
            className="align-items-center mb-0 mb-sm-2"
          >
            <Form.Label column xs="auto">
              <TeX>R_t</TeX> slider
            </Form.Label>
            <Col>
              <RangeSlider
                inputProps={{ id: "rtSlider" }}
                min={0.5}
                step={0.01}
                max={1.5}
                value={rt}
                tooltipPlacement="top"
                onChange={(e) => {
                  setAnimating(false);
                  setRt(parseFloat(e.target.value));
                }}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                aria-label={`${animating ? "Stop" : "Resume"} animation`}
                onClick={toggleAnimation}
                className="rounded-circle"
              >
                <FontAwesomeIcon icon={animating ? faPause : faPlay} />
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row} controlId="statePicker">
            <Form.Label column xs={12} sm="auto">
              Pick a U.S. state to fill its current <TeX>R_t</TeX> estimate:
            </Form.Label>
            <Col xs={12} sm md="auto">
              <Form.Control
                as="select"
                value={usState}
                onChange={(e) => {
                  setAnimating(false);
                  setUsState(e.target.value);
                }}
              >
                <option></option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
