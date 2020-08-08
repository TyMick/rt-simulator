import React from "react";
import { Navbar as RBNavbar, Container, Nav } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <RBNavbar
      as="header"
      variant="dark"
      bg="dark"
      style={{ marginBottom: "2rem" }}
    >
      <Container fluid="xl">
        <RBNavbar.Brand>
          <TeX>R_t</TeX> Simulator
        </RBNavbar.Brand>
        <Nav>
          <Nav.Link
            href="https://github.com/tywmick/rt-simulator"
            title="tywmick/rt-simulator on GitHub"
            className="pr-0"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Nav.Link>
        </Nav>
      </Container>
    </RBNavbar>
  );
}
