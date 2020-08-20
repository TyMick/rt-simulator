import React from "react";
import TeX from "@matejmazur/react-katex";
import { safeLoad } from "js-yaml";
import TweetThis from "./tweet-this";
import rtTrackersYaml from "../constants/rt-trackers.yaml.js";

export default function Application() {
  const rtTrackers = safeLoad(rtTrackersYaml);

  return (
    <>
      <p>
        Exponential growth is a force to be reckoned with.{" "}
        <TweetThis
          tweetText={`If #COVID19’s reproduction number is "just" 1.1, daily #coronavirus transmissions will increase 13-fold in the next four months.`}
          tweetUrl="https://rtsimulator.com"
          tweetRelated="CorrieMick"
        >
          If COVID-19&rsquo;s reproduction number is &ldquo;just&rdquo;{" "}
          <TeX>1.1</TeX>,{" "}
          <strong>
            daily coronavirus transmissions will increase 13-fold in the next
            four months
          </strong>
          .
        </TweetThis>{" "}
        So please, please do all you can to keep COVID&rsquo;s <TeX>R_t</TeX>{" "}
        below <TeX>1</TeX> until a widespread{" "}
        <a
          href="https://www.nytimes.com/interactive/2020/science/coronavirus-vaccine-tracker.html"
          title="Coronavirus Vaccine Tracker - The New York Times"
        >
          vaccine
        </a>{" "}
        is produced.
      </p>

      <p>
        Estimating <TeX>R_t</TeX> in real time is always a difficult endeavor,
        but here are all of the websites I&rsquo;m aware of that are doing just
        that:
      </p>

      <ul>
        {rtTrackers.map((site) => {
          const name = site.name.replace(/_t/g, "<sub>t</sub>");
          return (
            <li key={site.name} className="mb-1">
              <a href={site.url} dangerouslySetInnerHTML={{ __html: name }} />
              <span className="text-muted"> – {site.region}</span>
            </li>
          );
        })}
        <small className="d-block text-secondary">
          <a
            href="https://github.com/tywmick/rt-simulator/edit/master/constants/rt-trackers.yaml.js"
            title="Edit rt-trackers.yaml.js on GitHub"
            className="text-secondary"
            style={{ textDecoration: "underline" }}
          >
            Edit this list
          </a>{" "}
          or{" "}
          <a
            href="https://tymick.me/connect"
            className="text-secondary"
            style={{ textDecoration: "underline" }}
          >
            let me know
          </a>{" "}
          if I&rsquo;m missing any sites
        </small>
      </ul>

      <p>
        I encourage you to keep up with how <TeX>R_t</TeX> is changing in your
        area, <em>especially</em> if you&rsquo;re making decisions that affect
        public policy.
      </p>
    </>
  );
}
