import React from "react";
import { Container } from "react-bootstrap";
import useBreakpoints from "use-window-width-breakpoints";
import Subtitle from "./Subtitle";

export default function Headings() {
  const breakpoint = useBreakpoints();

  return (
    <Container fluid={breakpoint.up.lg} className="mt-5 text-lg-center">
      <h1>
        Why it&rsquo;s so important to keep COVID&#8209;19&rsquo;s{" "}
        <i>
          R<sub>t</sub>
        </i>{" "}
        below 1
      </h1>
      <Subtitle>A lesson in exponential growth</Subtitle>
    </Container>
  );
}