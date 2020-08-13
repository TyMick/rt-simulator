import React, { useState } from "react";
import { Container, Form, Col } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";
import chroma from "chroma-js";
import useCovidData from "../hooks/useCovidData";
import useAnimation from "../hooks/useAnimation";
import ChartCaption from "./ChartCaption";
import Chart from "./Chart";
import RtSlider from "./RtSlider";

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
            <Form.Group as={Form.Row} controlId="statePicker">
              <Form.Label column xs={12} sm="auto">
                Pick a U.S. state to fill its current <TeX>R_t</TeX> estimate:
              </Form.Label>
              <Col xs={12} sm md="auto">
                <Form.Control
                  as="select"
                  value={region}
                  custom
                  onChange={(e) => {
                    setAnimating(false);
                    setUserHasChangedIDI(true);

                    const region = e.target.value;
                    setRegion(region);
                    if (region) {
                      setRt(stateData[region].rtEstimate);
                      setInitialDailyInfections(
                        stateData[region].newCases7DayAvg
                      );
                    }
                  }}
                >
                  <option></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Control>
              </Col>
            </Form.Group>
          )}
        </Form>
      </Container>
    </>
  );
}
