import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import chroma from "chroma-js";
import useCovidData from "../hooks/useCovidData";
import useAnimation from "../hooks/useAnimation";
import ChartCaption from "./ChartCaption";
import Chart from "./Chart";
import RtSlider from "./RtSlider";
import StatePicker from "./StatePicker";

export default function InteractiveChart({
  setInitialDailyInfections,
  setUserHasChangedIDI,
  infectionSpreadSims,
}) {
  const [region, setRegion] = useState("");
  const [rt, setRt] = useState(1.1);

  const { animating, setAnimating, toggleAnimation } = useAnimation(
    rt,
    setRt,
    setRegion,
    { animateAtStart: true }
  );

  const successColor = "#28a745";
  const warningColor = "#ffc107";
  const dangerColor = "#dc3545";
  function getRtColor(rt) {
    return chroma
      .scale([successColor, warningColor, dangerColor])
      .domain([0.95, 1.05])(rt)
      .hex();
  }

  const { stateData } = useCovidData();

  return (
    <>
      <Container as="figure" fluid="xl" className="cap-width-lg mb-0">
        <ChartCaption {...{ rt, getRtColor }} />
        <Chart {...{ infectionSpreadSims, rt, getRtColor }} />
      </Container>

      {/* Interactive elements */}
      <Container className="cap-width-lg">
        <Form>
          <RtSlider
            {...{
              rt,
              setRt,
              animating,
              setAnimating,
              toggleAnimation,
              setRegion,
            }}
          />
          {stateData && (
            <StatePicker
              {...{
                setRt,
                setInitialDailyInfections,
                region,
                setRegion,
                setAnimating,
                setUserHasChangedIDI,
              }}
            />
          )}
        </Form>
      </Container>
    </>
  );
}
