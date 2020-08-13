import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import TeX from "@matejmazur/react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function RtSlider({
  rt,
  setRt,
  animating,
  setAnimating,
  toggleAnimation,
  setRegion,
}) {
  return (
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
            setRegion("");
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
  );
}
