import React from "react";
import { Container, Form } from "react-bootstrap";
import chroma from "chroma-js";
import useCovidData from "../hooks/useCovidData";
import ChartCaption from "./ChartCaption";
import Chart from "./Chart";
import RtSlider from "./RtSlider";
import InitialDailyInfectionsInput from "./InitialDailyInfectionsInput";
import StatePicker from "./StatePicker";

export default function InteractiveChart({
  rt,
  rtLower80,
  rtUpper80,
  animating,
  initialDailyInfections,
  region,
}) {
  const successColor = "#28a745";
  const warningColor = "#ffc107";
  const dangerColor = "#dc3545";
  function getRtColor(r) {
    return chroma
      .scale([successColor, warningColor, dangerColor])
      .domain([0.9, 1.1])(r)
      .hex();
  }

  const { covidDataLoaded } = useCovidData();

  return (
    <>
      <Container as="figure" fluid="xl" className="cap-width-lg mb-0">
        <ChartCaption {...{ rt, rtLower80, rtUpper80, getRtColor }} />
        <Chart
          {...{ rt, rtLower80, rtUpper80, getRtColor, initialDailyInfections }}
        />
      </Container>

      <Container className="cap-width-lg">
        <Form>
          <RtSlider {...{ rt, animating }} />
          <InitialDailyInfectionsInput {...{ initialDailyInfections }} />
          {covidDataLoaded && <StatePicker {...{ region }} />}
        </Form>
      </Container>
    </>
  );
}
