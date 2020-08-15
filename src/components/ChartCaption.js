import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import TeX from "@matejmazur/react-katex";
import clsx from "clsx";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ChartCaption({ rt, rtLower80, rtUpper80, getRtColor }) {
  const bp = useWindowWidthBreakpoints();

  return (
    <figcaption
      className={clsx("text-center mb-n1 mb-sm-n2", bp.xs ? "h5" : "h4")}
    >
      {bp.xs && <div className="h5 mb-0">Daily new infections when</div>}

      <TeX
        math={`R_t ${rtLower80 && rtUpper80 ? "\\approx" : "="} ${rt}${
          rt.toString().length === 1 ? ".0" : ""
        }`}
        style={{ color: getRtColor(rt) }}
      />
      {
        // Adding an invisible 0 for spacing on multiples of 0.1 when not using
        // confidence intervals
        rt.toString().length !== 4 && rtLower80 === undefined && (
          <TeX math="0" className="invisible" />
        )
      }

      {rtLower80 && rtUpper80 && (
        <>
          <TeX math={`\\scriptsize \\text{80\\% }`} className="ml-3 ml-sm-4" />
          <OverlayTrigger
            overlay={<Tooltip id="CI">confidence interval</Tooltip>}
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
