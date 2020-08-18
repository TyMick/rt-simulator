import React, { useContext } from "react";
import { Form, Col } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import TeX from "@matejmazur/react-katex";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { DispatchContext } from "../reducer";
import IconButton from "./icon-button";

export default function RtSlider({ rt, animating }) {
  const dispatch = useContext(DispatchContext);

  return (
    <Form.Group
      as={Form.Row}
      controlId="rtSlider"
      className="align-items-center mb-2"
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
            const float = parseFloat(e.target.value);
            if (float !== rt) {
              dispatch({ type: "setRt", payload: float });
            }
          }}
        />
      </Col>
      <Col xs="auto">
        <IconButton
          variant="primary"
          aria-label={`${animating ? "Stop" : "Resume"} animation`}
          onClick={() => dispatch({ type: "toggleAnimation" })}
          icon={animating ? faPause : faPlay}
        />
      </Col>
    </Form.Group>
  );
}
