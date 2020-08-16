import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import Navbar from "./components/Navbar";
import Headings from "./components/Headings";
import Introduction from "./components/Introduction";
import InteractiveChart from "./components/InteractiveChart";

export default function App() {
  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  return (
    <>
      <Navbar />
      <main>
        <Headings />
        {!chartFirst && <Introduction chartFirst={chartFirst} />}
        <InteractiveChart />
        {chartFirst && <Introduction chartFirst={chartFirst} />}
      </main>
    </>
  );
}
