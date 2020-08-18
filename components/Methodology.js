import React from "react";
import TeX from "@matejmazur/react-katex";
import useCovidData from "../hooks/use-covid-data";

export default function Methodology() {
  const { covidDataLoaded } = useCovidData();

  return (
    <>
      <h2 className="mt-5">Methodology &amp; Data</h2>

      <p>
        I adapted{" "}
        <a href="https://github.com/tywmick/rt-simulator/blob/master/src/model.js">
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
        with a mean of 4.7 days and standard deviation 2.9 days.
      </p>

      {covidDataLoaded && (
        <p>
          The current <TeX>R_t</TeX> estimates and average daily cases for each
          U.S. state are fetched directly{" "}
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
          that as you look further back in time, these confidence intervals
          become smaller with the benefit of more data.
        </p>
      )}
    </>
  );
}
