import React from "react";
import { Container } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";

export default function Introduction() {
  return (
    <Container className="cap-width-lg">
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
        What may surprise you, though, is how sensitive that pivot point of{" "}
        <TeX>R_t = 1.0</TeX> is. See for yourself:
      </p>
    </Container>
  );
}
