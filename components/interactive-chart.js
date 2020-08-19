import React, { useReducer, useCallback } from "react";
import { Container, Form } from "react-bootstrap";
import chroma from "chroma-js";
import { initialState, reducer, DispatchContext } from "../reducer";
import useAnimation from "../hooks/use-animation";
import useCovidData from "../hooks/use-covid-data";
import ChartCaption from "./chart-caption";
import Chart from "./chart";
import RtSlider from "./rt-slider";
import InitialDailyInfectionsInput from "./initial-daily-infections-input";
import StatePicker from "./state-picker";

export default function InteractiveChart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useAnimation(state.animating, state.rt, dispatch);

  useCovidData(dispatch);

  const getRtColor = useCallback(
    (r) =>
      chroma
        .scale(["#28a745", "#e3a900", "#dc3545"])
        .mode("lrgb")
        .domain([0.9, 1.1])(r)
        .hex(),
    []
  );

  const { covidDataLoaded } = useCovidData();

  return (
    <DispatchContext.Provider value={dispatch}>
      <Container as="figure" fluid="xl" className="cap-width-lg mb-0">
        <ChartCaption
          rt={state.rt}
          rtLower80={state.rtLower80}
          rtUpper80={state.rtUpper80}
          getRtColor={getRtColor}
        />
        <Chart
          rt={state.rt}
          rtLower80={state.rtLower80}
          rtUpper80={state.rtUpper80}
          initialDailyInfections={state.initialDailyInfections}
          getRtColor={getRtColor}
        />
      </Container>

      <Container as={Form} fluid="md" className="cap-width-lg mb-5">
        <RtSlider rt={state.rt} animating={state.animating} />
        <InitialDailyInfectionsInput
          initialDailyInfections={state.initialDailyInfections}
          region={state.region}
        />
        {covidDataLoaded && <StatePicker region={state.region} />}
      </Container>
    </DispatchContext.Provider>
  );
}
