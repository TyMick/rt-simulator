import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { Container } from "react-bootstrap";
import Headings from "../components/headings";
import Introduction from "../components/introduction";
import InteractiveChart from "../components/interactive-chart";
import Application from "../components/application";

export default function App() {
  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  return (
    <>
      <main>
        <Headings />

        {!chartFirst && (
          <Container fluid="md" className="cap-width-lg mb-4">
            <Introduction chartFirst={chartFirst} />
          </Container>
        )}

        <InteractiveChart />

        <Container fluid="md" className="cap-width-lg mb-5">
          {chartFirst && <Introduction chartFirst={chartFirst} />}
          <Application />
        </Container>
      </main>
    </>
  );
}
