import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav>
      <a
        href="https://github.com/tywmick/rt-simulator"
        title="tywmick/rt-simulator on GitHub"
        className="github-link"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </nav>
  );
}
