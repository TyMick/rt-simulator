import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import useWindowOrientation from "use-window-orientation";
import { Container } from "react-bootstrap";
import useCovidData from "../hooks/use-covid-data";
import Navbar from "../components/Navbar";
import Headings from "../components/headings";
import Introduction from "../components/introduction";
import InteractiveChart from "../components/interactive-chart";
import Application from "../components/application";
import Footer from "../components/footer";
import LoadingAnimation from "../components/loading-animation";

export default function Index() {
  const { covidDataLoaded } = useCovidData();

  const breakpoint = useWindowWidthBreakpoints();
  const { portrait, landscape } = useWindowOrientation();
  const chartFirst =
    (portrait && breakpoint.xs) || (landscape && breakpoint.down.md);

  return (
    <>
      <Navbar tex={covidDataLoaded} />

      {covidDataLoaded ? (
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

          <Footer methodologyLink />
        </>
      ) : (
        <LoadingAnimation>
          Just a moment while we fetch
          <br />
          the latest COVID-19 data&hellip;
        </LoadingAnimation>
      )}
    </>
  );
}
