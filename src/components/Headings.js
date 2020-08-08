import React from "react";
import { Container } from "react-bootstrap";
import useBreakpoints from "use-window-width-breakpoints";
import Subtitle from "./Subtitle";

export default function Headings() {
  const breakpoint = useBreakpoints();

  return (
    <Container fluid={breakpoint.up.lg} className="text-lg-center">
      <h1>
        Why it&rsquo;s so important to keep COVID&rsquo;s
        {breakpoint.up.lg ? <br /> : " "}reproduction number below 1
      </h1>
      <Subtitle>A lesson in exponential growth</Subtitle>
    </Container>
  );
}
