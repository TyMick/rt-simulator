import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";
import clsx from "clsx";
import { round } from "lodash";

export default function ChartCaption({ rt, rtLower80, rtUpper80, getRtColor }) {
  const bp = useWindowWidthBreakpoints();

  return (
    <figcaption className={clsx("text-center mb-n1", bp.xs ? "h5" : "h4")}>
      {bp.xs && <div className="h5 mb-0">Daily new infections when</div>}

      <TeX
        math={`\\textcolor{${getRtColor(rt)}}{R_t ${
          rtLower80 && rtUpper80 ? "\\approx" : "="
        } ${rt}${round(rt % 1, 2) === 0 ? ".0" : ""}}${
          // Adding a white 0 for spacing on multiples of 0.1 when not
          // using confidence intervals
          round((10 * rt) % 1, 1) === 0 && rtLower80 === undefined
            ? "\\htmlClass{invisible}{0}"
            : ""
        }`}
        settings={{ trust: true }}
      />

      {rtLower80 && rtUpper80 && (
        <>
          <TeX math={`\\scriptsize \\text{80\\% }`} className="ml-3 ml-sm-4" />
          <OverlayTrigger
            overlay={
              <Tooltip id="ci">
                Confidence Interval
                <br />
                (the shaded part of the graph)
              </Tooltip>
            }
          >
            <TeX
              math={`\\scriptsize \\text{CI}`}
              as="abbr"
              aria-label="confidence interval"
              tabIndex={0}
              style={{ borderBottom: "1px dotted #212529", cursor: "help" }}
            />
          </OverlayTrigger>
          <TeX
            math={`\\scriptsize \\text{: }(\\textcolor{${getRtColor(
              rtLower80
            )}}{${rtLower80.toFixed(2)}}, \\textcolor{${getRtColor(
              rtUpper80
            )}}{${rtUpper80.toFixed(2)}})`}
          />
        </>
      )}
    </figcaption>
  );
}
