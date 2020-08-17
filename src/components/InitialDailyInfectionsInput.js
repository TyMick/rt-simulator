import React, { memo, useContext } from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { DispatchContext } from "../reducer";
import useCovidData from "../hooks/useCovidData";
import IconButton from "./IconButton";
import clsx from "clsx";

const InitialDailyInfectionsInput = memo(({ initialDailyInfections }) => {
  const dispatch = useContext(DispatchContext);
  const { covidDataLoaded, usaNewCases7DayAvg } = useCovidData();

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
        {/* Only add tooltip if COVID data has loaded */}
        {covidDataLoaded ? (
          <OverlayTrigger
            overlay={
              <Tooltip id="current-usa-average">
                Current U.S. 7-day average:{" "}
                {usaNewCases7DayAvg.toLocaleString()}
              </Tooltip>
            }
          >
            <Form.Control
              value={initialDailyInfections.toLocaleString()}
              style={{ ...(breakpoint.up.sm && { width: "7.75em" }) }}
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
          </OverlayTrigger>
        ) : (
        <Form.Control
          value={initialDailyInfections.toLocaleString()}
          style={{ ...(breakpoint.up.sm && { width: "7.75em" }) }}
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
        )}
      </Col>
      {covidDataLoaded && (
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
      )}
    </Form.Group>
  );
});

export default InitialDailyInfectionsInput;
