import React, { useContext } from "react";
import { Form, Col } from "react-bootstrap";
import { DispatchContext } from "../reducer";

export default function InitialDailyInfectionsInput({
  initialDailyInfections,
}) {
  const dispatch = useContext(DispatchContext);

  return (
    <Form.Group as={Form.Row} controlId="idiInput" className="mb-2 mb-sm-3">
      <Form.Label column xs="auto">
        Initial daily infections:
      </Form.Label>
      <Col xs="auto">
        <Form.Control
          value={initialDailyInfections.toLocaleString()}
          style={{ width: "8em" }}
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
    </Form.Group>
  );
}
