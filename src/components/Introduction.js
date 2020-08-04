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
        Entire websites, like{" "}
        <a href="https://rt.live/">
          R<sub>t</sub> Live
        </a>{" "}
        and{" "}
        <a href="https://epiforecasts.io/covid/posts/global/">EpiForecasts</a>,
        are dedicated to modeling and tracking <TeX>R_t</TeX> values in
        different regions of the world, so (with exceptions, I&rsquo;m sure) it
        isn&rsquo;t difficult to find a good <TeX>R_t</TeX> estimate for the
        country or state you live in. But how much does the number matter?
        It&rsquo;s fairly obvious that when <TeX>R_t = 2</TeX>, the virus will
        spread pretty quickly, but what if <TeX>R_t = 1.1</TeX>? That
        can&rsquo;t be too bad, right?
      </p>
    </Container>
  );
}
