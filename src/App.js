import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Headings from "./components/Headings";
import Introduction from "./components/Introduction";
import InteractiveChart from "./components/InteractiveChart";
import Application from "./components/Application";
import Methodology from "./components/Methodology";

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

        {!chartFirst && (
          <Container fluid="md" className="cap-width-lg mb-4">
            <Introduction chartFirst={chartFirst} />
          </Container>
        )}

        <InteractiveChart />

        <Container fluid="md" className="cap-width-lg mb-5">
          {chartFirst && <Introduction chartFirst={chartFirst} />}
          <Application />
          <Methodology />
        </Container>
      </main>
    </>
  );
}
