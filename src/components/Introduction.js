import React from "react";
import { Container } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";

export default function Introduction({ chartFirst }) {
  return (
    <Container fluid="md" className="cap-width-lg mb-4">
      <p>
        By many respects, the most important COVID-19 number to watch is its{" "}
        <a href="https://en.wikipedia.org/wiki/Basic_reproduction_number#Effective_reproduction_number">
          effective reproduction number
        </a>{" "}
        (<TeX>R_t</TeX>), the average number of people who become infected by an
        infectious person. For example, if <TeX>R_t = 2</TeX>, every person who
        contracts COVID-19, on average, will spread the virus to two other
        people.
      </p>

      <p>
        But what if each person with COVID only infects an average of{" "}
        <TeX>1.1</TeX> people? <TeX>1.1</TeX> can&rsquo;t be <em>that</em> bad,
        can it? Well,{" "}
        {chartFirst
          ? "you saw for yourself in the chart above."
          : "see for yourself:"}
      </p>
    </Container>
  );
}
