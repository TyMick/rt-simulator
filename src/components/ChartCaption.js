import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import TeX from "@matejmazur/react-katex";
import clsx from "clsx";

export default function ChartCaption({ rt, getRtColor }) {
  const bp = useWindowWidthBreakpoints();

  return (
    <figcaption className={clsx("text-center mb-n2", bp.xs ? "h5" : "h4")}>
      {bp.xs && <div className="h5 mb-0">Daily new infections when</div>}
      <TeX
        math={`R_t = ${rt}${rt.toString().length === 1 ? ".0" : ""}`}
        style={{ color: getRtColor(rt) }}
      />
      {/* Adding an invisible 0 for spacing on multiples of 0.1 */}
      {rt.toString().length !== 4 && <TeX math="0" className="invisible" />}
    </figcaption>
  );
}
