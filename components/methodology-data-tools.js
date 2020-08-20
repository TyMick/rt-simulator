import React from "react";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import Link from "next/link";
import { Container } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";

export default function MethodologyDataTools() {
  const breakpoint = useWindowWidthBreakpoints();

  return (
    <Container
      as="main"
      className="cap-width-lg mb-5"
      style={{ marginTop: breakpoint.down.sm ? "2rem" : "3rem" }}
    >
      <Link href="/">
        <a className="d-block mb-1">&larr; Return to main page</a>
      </Link>

      <h1 className="mb-2 mb-sm-3">Methodology, Data, &amp; Tools</h1>

      <p>
        I adapted{" "}
        <a href="https://github.com/tywmick/rt-simulator/blob/master/model.js">
          my simulation model
        </a>{" "}
        from R<sub>t</sub> Live&rsquo;s model as they lay out in their{" "}
        <a href="https://github.com/rtcovidlive/covid-model/blob/master/tutorial.ipynb">
          tutorial notebook
        </a>
        . It accounts for the fact that it takes a few days for an infected
        person to pass on the virus by incorporating that delay (called the{" "}
        <dfn>generation time</dfn>) as a{" "}
        <a href="https://en.wikipedia.org/wiki/Log-normal_distribution">
          log-normal probability distribution
        </a>{" "}
        with a mean of 4.7 days and standard deviation 2.9 days. Then, the
        number of newly infected people on a given day <TeX>y_t</TeX> is a sum
        that looks at all previous days, weighing the number of newly infected
        people <TeX>i</TeX> days ago (<TeX math={`y_{t - i}`} />) by the
        generation time probability (<TeX>g_i</TeX>) for that number of days and
        the effective reproduction number (which for the purposes of this
        simulation is being kept constant at <TeX>R_e</TeX>). More succinctly,
      </p>

      <TeX as="figure" block math="y_t = \sum_{i = 1}^M y_{t - i} R_e g_i" />

      <p>
        Simulations run from today&rsquo;s date to four months in the future,
        and they treat every day prior to the start date as having a number of
        new infections equal to the &ldquo;Initial daily infections&rdquo;
        setting below the chart.
      </p>

      <p>
        For the &ldquo;Pick a U.S. state&rdquo; dropdown (which only appears if
        the app is able to download the required data), current <TeX>R_t</TeX>{" "}
        estimates and average daily cases are fetched directly{" "}
        <a href="https://rt.live/#footer">
          from R<sub>t</sub> Live
        </a>
        , and they source their case count data from{" "}
        <a href="https://covidtracking.com/">The COVID Tracking Project</a>.
        These real-time <TeX>R_t</TeX> estimates have an inherent degree of
        uncertainty, so each estimate includes an 80%{" "}
        <dfn style={{ fontStyle: "normal" }}>confidence interval</dfn>, which
        essentially means that we can be 80% sure that the <em>actual</em>{" "}
        <TeX>R_t</TeX> value lies somewhere between those upper and lower
        bounds. You&rsquo;ll notice if you visit{" "}
        <a href="https://rt.live/">
          R<sub>t</sub> Live&rsquo;s homepage
        </a>{" "}
        that as you look further back in time, these confidence intervals become
        smaller with the benefit of more data.
      </p>

      <p className="mb-1">
        These are the primary tools I used in this project:
      </p>

      <ul>
        <li className="mb-1">
          Data visualization:{" "}
          <a href="https://vega.github.io/vega-lite/">Vega-Lite</a>
        </li>
        <li className="mb-1">
          Statistics package: <a href="http://www.jstat.org/">jStat</a>
        </li>
        <li className="mb-1">
          Data fetching: <a href="https://swr.vercel.app/">SWR</a>
        </li>
        <li className="mb-1">
          Data wrangling: <a href="http://www.data-forge-js.com/">Data-Forge</a>
        </li>
        <li className="mb-1">
          Math typesetting:{" "}
          <a href="https://katex.org/">
            <TeX>\KaTeX</TeX>
          </a>{" "}
          via{" "}
          <a href="https://github.com/MatejBransky/react-katex">react-katex</a>
        </li>
        <li className="mb-1">
          Web framework: <a href="https://nextjs.org/">Next.js</a>
        </li>
        <li>
          Web design library: <a href="https://getbootstrap.com/">Bootstrap</a>{" "}
          via <a href="https://react-bootstrap.github.io/">React Bootstrap</a>
        </li>
      </ul>

      <p>
        If you have any other questions, I&rsquo;d love to{" "}
        <a href="https://tymick.me/connect">get in touch</a>!
      </p>
    </Container>
  );
}
