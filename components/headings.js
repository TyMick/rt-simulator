import React from "react";
import { Container } from "react-bootstrap";
import useBreakpoints from "use-window-width-breakpoints";

export default function Headings() {
  const breakpoint = useBreakpoints();

  return (
    <Container
      fluid={!breakpoint.md}
      className="text-lg-center"
      style={{ marginTop: breakpoint.xs ? "1.5rem" : "2rem" }}
    >
      <h1 className="long-heading">
        Why it&rsquo;s so important to keep COVID&rsquo;s
        {breakpoint.up.lg ? <br /> : " "}reproduction number below 1
      </h1>
      <div id="subtitle">The power of exponential growth</div>
    </Container>
  );
}
