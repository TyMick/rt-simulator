import React, { memo, useContext } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import NumberFormatInput from "react-number-format";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { DispatchContext } from "../lib/reducer";
import useCovidData from "../hooks/use-covid-data";
import IconButton from "./icon-button";
import clsx from "clsx";

const InitialDailyInfectionsInput = memo(
  ({ initialDailyInfections, region }) => {
    const dispatch = useContext(DispatchContext);
    const { usaNewCases7DayAvg } = useCovidData();

    const breakpoint = useWindowWidthBreakpoints();

    return (
      <Form.Group
        as={Form.Row}
        controlId="idiInput"
        className="mb-2 justify-content-md-center"
      >
        <Form.Label column xs="auto">
          Initial daily infections:
        </Form.Label>
        <Col xs sm="auto">
          {region ? (
            <Form.Control
              as={NumberFormatInput}
              value={initialDailyInfections}
              thousandSeparator={true}
              decimalScale={0}
              allowNegative={false}
              onValueChange={({ floatValue }) => {
                if (floatValue !== initialDailyInfections) {
                  dispatch({
                    type: "setInitialDailyInfections",
                    payload: floatValue,
                  });
                }
              }}
              style={{ ...(breakpoint.up.sm && { width: "7.75em" }) }}
            />
          ) : (
            <OverlayTrigger
              overlay={
                <Tooltip id="current-usa-average">
                  Current U.S. 7-day average:{" "}
                  {usaNewCases7DayAvg.toLocaleString()}
                </Tooltip>
              }
            >
              <Form.Control
                as={NumberFormatInput}
                value={initialDailyInfections}
                thousandSeparator={true}
                decimalScale={0}
                allowNegative={false}
                onValueChange={({ floatValue }) => {
                  if (floatValue !== initialDailyInfections) {
                    dispatch({
                      type: "setInitialDailyInfections",
                      payload: floatValue,
                    });
                  }
                }}
                style={{ ...(breakpoint.up.sm && { width: "7.75em" }) }}
              />
            </OverlayTrigger>
          )}
        </Col>
        <Col
          xs="auto"
          className={clsx(
            initialDailyInfections === usaNewCases7DayAvg &&
              (breakpoint.xs ? "d-none" : "invisible")
          )}
        >
          <IconButton
            variant="primary"
            aria-label="Reset to current United States 7-day average"
            onClick={() => dispatch({ type: "resetInitialDailyInfections" })}
            icon={faUndoAlt}
          />
        </Col>
      </Form.Group>
    );
  }
);
InitialDailyInfectionsInput.displayName = "InitialDailyInfectionsInput";
export default InitialDailyInfectionsInput;
