import React, { useContext } from "react";
import { Form, Col } from "react-bootstrap";
import { DispatchContext } from "../reducer";
import useCovidData from "../hooks/useCovidData";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

export default function InitialDailyInfectionsInput({
  initialDailyInfections,
}) {
  const dispatch = useContext(DispatchContext);
  const { covidDataLoaded, usaNewCases7DayAvg } = useCovidData();

  return (
    <Form.Group as={Form.Row} controlId="idiInput" className="mb-2 mb-sm-3">
      <Form.Label column xs="auto">
        Initial daily infections:
      </Form.Label>
      <Col xs="auto">
        <Form.Control
          value={initialDailyInfections.toLocaleString()}
          style={{ width: "7.75em" }}
          onChange={(e) => {
            // Try to extract a valid integer from the input value
            const fixedValue =
              e.target.value.replace(/\D/g, "").replace(/^0+/, "") || 0;
            dispatch({
              type: "setInitialDailyInfections",
              payload: parseInt(fixedValue),
            });
          }}
        />
      </Col>
      {covidDataLoaded && initialDailyInfections !== usaNewCases7DayAvg && (
        <Col xs="auto">
          <IconButton
            variant="primary"
            tooltip="Reset to current United States 7-day average"
            tooltipId="reset"
            onClick={() => dispatch({ type: "resetInitialDailyInfections" })}
            icon={faUndoAlt}
          />
        </Col>
      )}
    </Form.Group>
  );
}
