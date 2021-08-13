import React, { memo, useContext } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Form, Col } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";
import { DispatchContext } from "../reducer";

const StatePicker = memo(({ region }) => {
  const dispatch = useContext(DispatchContext);
  const bp = useWindowWidthBreakpoints();

  return (
    <Form.Group
      as={Form.Row}
      controlId="statePicker"
      className="justify-content-lg-center"
    >
      <Form.Label column xs={12} sm="auto">
        Pick a U.S. state to fill its current <TeX>R_t</TeX> estimate and
        {bp.md ? " " : " 7-day "}average {bp.md ? "daily" : "of new"} cases:
      </Form.Label>
      <Col xs={12} md lg="auto">
        <Form.Control
          as="select"
          custom
          value={region}
          onChange={(e) => {
            if (e.target.value !== region) {
              dispatch({ type: "setRegion", payload: e.target.value });
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
  );
});
StatePicker.displayName = "StatePicker";
export default StatePicker;
